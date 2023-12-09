import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import GreenspacesTable from "./GreenspacesTable";
import { setIsLoading } from "../../redux/isLoadingSlice";
import { getGreenspaces } from "../../services/greenspacesService";

const GreenSpaces = () => {
  const [records, setRecords] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterArea, setFilterArea] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const dispatch = useDispatch();

  const nameMatches = (record, filterName) =>
    !filterName || record.name.includes(filterName);

  const areaMatches = (record, filterArea) =>
    !filterArea ||
    (record.area && record.area.toString().includes(filterArea.toString()));

  const categoryMatches = (record, filterCategory) =>
    !filterCategory || record.category === filterCategory;

  const groupMatches = (record, selectedGroup) =>
    !selectedGroup || record.group === selectedGroup;

  const filteredRecords = records.filter(
    (record) =>
      nameMatches(record, filterName) &&
      areaMatches(record, filterArea) &&
      categoryMatches(record, filterCategory)
  );

  useEffect(() => {
    getNewRecords();
  }, []);

  const getNewRecords = async () => {
    dispatch(setIsLoading(true));

    try {
      const newRecords = await getGreenspaces();

      setRecords(
        Object.entries(newRecords).map(([id, value]) => ({ ...value, id }))
      );
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
        width: "100%",
        padding: "8px 16px",
      }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <GreenspacesTable
        records={records}
        getNewRecords={getNewRecords}
      ></GreenspacesTable>
    </Stack>
  );
};

export default GreenSpaces;
