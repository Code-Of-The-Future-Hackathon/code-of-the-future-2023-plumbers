import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import GreenspacesTable from "./GreenspacesTable";
import { setIsLoading } from "../../redux/isLoadingSlice";
import { getGreenspaces } from "../../services/greenspacesService";
import GreenSpacesTypes from "./GreenSpacesTypes";
import { GREEN_SPACES_AVAILABLE } from "../../constants";

const GreenSpaces = () => {
  const [records, setRecords] = useState([]);
  const [visibleRecords, setVisibleRecords] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(GREEN_SPACES_AVAILABLE);
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

        return selectedTypes[record.type];
      })
    );
  }, [records, selectedTypes]);

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
      />
      <GreenspacesTable records={visibleRecords} />
    </Stack>
  );
};

export default GreenSpaces;
