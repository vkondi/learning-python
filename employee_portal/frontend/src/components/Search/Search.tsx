import Box from "@mui/material/Box";
import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField";
import { useRootContext } from "../../context/RootContext";

const Search = () => {
  const { setShowEmpPopup, setEmpPopupAction } = useRootContext();

  const onAdd = () => {
    setShowEmpPopup(true);
    setEmpPopupAction("add");
  };

  return (
    <Box
      sx={{
        width: "100%",
        flexDirection: "row",
        display: "flex",
        columnGap: "10px",
        padding: "10px 0px",
        alignItems: "center",
      }}
    >
      <TextField
        sx={{ flex: 1, marginLeft: "10px" }}
        label="Search"
        id="fullWidth"
      />
      <Button
        variant="contained"
        sx={{ width: 180, marginRight: "10px" }}
        onClick={onAdd}
      >
        Add New Employee
      </Button>
    </Box>
  );
};

export default Search;
