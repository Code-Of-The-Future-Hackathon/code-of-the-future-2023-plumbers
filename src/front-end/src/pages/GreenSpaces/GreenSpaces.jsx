import React, { useState } from "react";
import {  Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import FilterGreenspaces from "./FilterGreenspaces";
import GreenspacesTable from "./GreenspacesTable";
//import AreasOfPublicUseGroups from './AreasOfPublicUseGroups';
//import ShowCurrentZonesButton from './ShowCurrentZonesButton';
//import AreasOfPublicUseTable from './AreasOfPublicUseTable';

const GreenSpaces = () => {
  const [records, setRecords] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterArea, setFilterArea] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groups, setGroups] = useState([]);
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
      categoryMatches(record, filterCategory) &&
      groupMatches(record, selectedGroup)
  );

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
      <FilterGreenspaces
        filterName={filterName}
        setFilterName={setFilterName}
        filterArea={filterArea}
        setFilterArea={setFilterArea}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />
      <GreenspacesTable></GreenspacesTable>
    </Stack>
  );
};

export default GreenSpaces;
