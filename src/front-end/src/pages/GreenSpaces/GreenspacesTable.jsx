import React from "react";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

import GreenspacesRow from "./GreenspacesRow";
const GreenspacesTable = () => {

  useEffect(() => {
    getNewRecords();
    
  }, []);

  const getNewRecords = async () => {
    dispatch(setLoader(true));

    try {
      const newRecords = await getGreenspaces();
      setRecords(
        Object.entries(newRecords).map(([id, value]) => ({ id, ...value }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoader(false));
    }
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
              onClick={() => handleSort("group")}
            >
              Група
              {sortConfig.key === "group" ? (
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
                groups={groups}
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
