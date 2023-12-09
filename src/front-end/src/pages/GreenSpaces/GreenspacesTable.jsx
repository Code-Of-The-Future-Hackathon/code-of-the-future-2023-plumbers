import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

import GreenspacesRow from "./GreenspacesRow";
const GreenspacesTable = ({records, getNewRecords}) => {



  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const sortedRecords = [...records].sort((a, b) => {
    if (sortConfig.key === 'area' || sortConfig.key === 'dynamic-area') {
      const areaA = parseFloat(a.area);
      const areaB = parseFloat(b.area);
      return sortConfig.direction === 'asc' ? areaA - areaB : areaB - areaA;
    } else {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
 
  return (
    <TableContainer
      component={Box}
      sx={{ mt: 4, border: "1px solid #e0e0e0", borderRadius: "0.5rem" }}
    >
      <Table sx={{ width: "100%" }}>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#10b981",
              "& > th": { color: "white", cursor: "pointer" },
            }}
          >
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              onClick={() => handleSort("name")}
            >
              Име
              {sortConfig.key === "name" ? (
                sortConfig.direction === "asc" ? (
                  <ArrowDropDown />
                ) : (
                  <ArrowDropUp />
                )
              ) : null}
            </TableCell>
             
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              onClick={() => handleSort("area")}
            >
              Ръчно вписана площ в кв. м.
              {sortConfig.key === "area" ? (
                sortConfig.direction === "asc" ? (
                  <ArrowDropDown />
                ) : (
                  <ArrowDropUp />
                )
              ) : null}
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              onClick={() => handleSort("dynamic-area")}
            >
              Динамично изчислена площ в кв. м.
              {sortConfig.key === "dynamic-area" ? (
                sortConfig.direction === "asc" ? (
                  <ArrowDropDown />
                ) : (
                  <ArrowDropUp />
                )
              ) : null}
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              onClick={() => handleSort("category")}
            >
              Категория
              {sortConfig.key === "category" ? (
                sortConfig.direction === "asc" ? (
                  <ArrowDropDown />
                ) : (
                  <ArrowDropUp />
                )
              ) : null}
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Зона
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRecords.length > 0 ? (
            sortedRecords.map((record) => (
              <GreenspacesRow
                key={record.id}
                record={record}
                getNewRecords={getNewRecords}
              />
            ))
          ) : (
            <TableRow>
              <TableCell align="center" sx={{ fontStyle: "italic" }}>
                Няма налични записи в момента.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GreenspacesTable;
