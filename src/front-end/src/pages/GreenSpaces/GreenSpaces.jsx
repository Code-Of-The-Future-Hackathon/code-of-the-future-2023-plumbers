import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import GreenspacesTable from "./GreenspacesTable";
import { setIsLoading } from "../../redux/isLoadingSlice";
import { getGreenspaces } from "../../services/greenspacesService";
import GreenSpacesTypes from "./GreenSpacesTypes";
import { GREEN_SPACES_AVAILABLE, GREEN_SPACES_SIZES } from "../../constants";
import { getGreenSpaceSizeResult } from "../../utils";

const GreenSpaces = () => {
  const [records, setRecords] = useState([]);
  const [visibleRecords, setVisibleRecords] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(GREEN_SPACES_AVAILABLE);
  const [selectedSizes, setSelectedSizes] = useState(GREEN_SPACES_SIZES);
  const dispatch = useDispatch();

  useEffect(() => {
    getNewRecords();
  }, []);

  useEffect(() => {
    setVisibleRecords(
      records.filter((record) => {
        if (Object.keys(selectedTypes).length === 0) {
          return true;
        }

        if (Object.keys(selectedSizes).length === 0) {
          return true;
        }

        const typeResult = selectedTypes[record.type];
        const sizeResult = getGreenSpaceSizeResult(
          record?.details?.areaInSquareKms || 0
        );

        console.log(GREEN_SPACES_SIZES[sizeResult]);

        return typeResult && GREEN_SPACES_SIZES[sizeResult];
      })
    );
  }, [records, selectedTypes, selectedSizes]);

  const getNewRecords = async () => {
    dispatch(setIsLoading(true));

    try {
      const newRecords = await getGreenspaces();
      setRecords(newRecords);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <Stack
      direction={"column"}
      spacing={2}
      sx={{
        margin: "2rem",
        padding: "8px 16px",
      }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <GreenSpacesTypes
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        selectedSizes={selectedSizes}
        setSelectedSizes={setSelectedSizes}
      />
      <GreenspacesTable records={visibleRecords} />
    </Stack>
  );
};

export default GreenSpaces;
