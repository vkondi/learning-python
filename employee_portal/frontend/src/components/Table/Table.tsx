import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useMemo } from "react";
import { useRootContext } from "../../context/RootContext";
import Search from "../Search/Search";

const paginationModel = { page: 0, pageSize: 10 };

export default function Table() {
  const { employees, setEmpPopupData, setEmpPopupAction, setShowEmpPopup } =
    useRootContext();

  const handleEditClick = (data) => {
    setEmpPopupData(data.row);
    setEmpPopupAction("edit");
    setShowEmpPopup(true);
  };

  const handleDeleteClick = (data) => {
    setEmpPopupData(data.row);
    setEmpPopupAction("delete");
    setShowEmpPopup(true);
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "emp_id", headerName: "ID", width: 70 },
      { field: "emp_name", headerName: "Name", flex: 3 },
      { field: "email", headerName: "Email", minWidth: 150, flex: 1 },
      {
        field: "emp_dob",
        headerName: "DOB",
        minWidth: 150,
        flex: 1,
        valueGetter: (_, row) =>
          `${new Date(row.emp_dob).toLocaleDateString()}`,
      },
      {
        field: "phone",
        headerName: "Phone",
        minWidth: 200,
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 100,
        cellClassName: "actions",
        getActions: (data) => {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={() => handleEditClick(data)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDeleteClick(data)}
              color="inherit"
            />,
          ];
        },
      },
    ],
    []
  );

  return (
    <Paper sx={{ minHeight: 500, margin: "30px", padding: "20px" }}>
      <Search />

      <DataGrid
        rows={employees}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20, 30]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
