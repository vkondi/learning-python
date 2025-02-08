import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import axios from "axios";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "emp_name", headerName: "Name", flex: 3 },
  { field: "email", headerName: "Email", width: 150 },
  {
    field: "emp_dob",
    headerName: "DOB",
    width: 150,
    valueGetter: (_, row) => `${new Date(row.emp_dob).toLocaleDateString()}`,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 200,
  },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (_, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  //   },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

const paginationModel = { page: 0, pageSize: 10 };

export default function Table() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("/api/get-all-employees")
      .then((response) => {
        console.log(response.data);
        setRows(response?.data ?? []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Paper sx={{ minHeight: 500, margin: "10px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20, 30]}
        // autoPageSize
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
