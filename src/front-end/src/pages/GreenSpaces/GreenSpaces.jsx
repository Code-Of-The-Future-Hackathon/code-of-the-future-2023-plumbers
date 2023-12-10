import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import GreenspacesTable from "./GreenspacesTable";
import { setIsLoading } from "../../redux/isLoadingSlice";
import { getGreenspaces } from "../../services/greenspacesService";

const GreenSpaces = () => {
  const [records, setRecords] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getNewRecords();
  }, []);

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
        margin: "5rem 2rem",
        padding: "8px 16px",
      }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <GreenspacesTable records={records} />
    </Stack>
  );
};

export default GreenSpaces;
