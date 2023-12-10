import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "area", numeric: true, disablePadding: false, label: "Area (sq. m.)" },
  { id: "type", numeric: false, disablePadding: false, label: "Type" },
  { id: "zone", numeric: false, disablePadding: false, label: "Zone" },
];

const GreenspacesTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? <Box component="span" /> : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default GreenspacesTableHead;
