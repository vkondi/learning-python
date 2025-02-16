import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { EmployeeType, useRootContext } from "../../context/RootContext";
import Grid from "@mui/material/Grid/Grid";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function EmployeePopup() {
  const {
    showEmpPopup,
    setShowEmpPopup,
    empPopupAction,
    empPopupData,
    addEmployee,
    updateEmployee,
    fetchEmployees,
    deleteEmployee,
    generateRandomEmployee,
    loading,
  } = useRootContext();

  const [formData, setFormData] = useState<EmployeeType>(empPopupData ?? {});

  const getPopupTitle = useCallback(() => {
    switch (empPopupAction) {
      case "add":
        return "Add New Employee";
      case "edit":
        return "Edit Employee Details";
      case "delete":
        return "Delete Employee?";
      default:
        return "";
    }
  }, [empPopupAction]);

  const title = getPopupTitle();
  const deleteLabel = useMemo(
    () =>
      empPopupAction === "delete" ? (
        <>
          Are you sure you want to delete record of employee{" "}
          <b>{formData?.emp_name}</b>?
        </>
      ) : (
        ""
      ),
    [formData?.emp_name]
  );

  const submitBtnLabel = empPopupAction === "delete" ? "Yes" : "Submit";
  const submitBtnVariant =
    empPopupAction === "delete" ? "outlined" : "contained";
  const cancelBtnVariant =
    empPopupAction === "delete" ? "contained" : "outlined";

  const handleClose = (syncData: boolean) => {
    setShowEmpPopup(false);
    if (syncData === true) fetchEmployees();
  };

  const onSubmit = async () => {
    console.log("formData: ", formData);

    switch (empPopupAction) {
      case "add":
        const resp = await addEmployee(formData);
        console.log("Resp: ", resp);

        if (resp.status === 201) {
          // TODO: Add a success snackbar
          handleClose(true);
        } else {
          const addError = resp?.response?.data?.error ?? resp?.message;
          console.log("Add API Error: ", addError);
        }

        break;
      case "edit":
        const updateResp = await updateEmployee(formData);
        console.log("Resp: ", updateResp);

        if (updateResp.status === 200) {
          // TODO: Add a success snackbar
          handleClose(true);
        } else {
          const updateError =
            updateResp?.response?.data?.error ?? updateResp?.message;
          console.log("Update API Error: ", updateError);
        }
        break;
      case "delete":
        const deleteResp = await deleteEmployee(formData?.emp_id);
        console.log("Resp: ", deleteResp);

        if (deleteResp.status === 200) {
          // TODO: Add a success snackbar
          handleClose(true);
        } else {
          const deleteError =
            deleteResp?.response?.data?.error ?? resp?.message;
          console.log("Delete API Error: ", deleteError);
        }
        break;
      default:
        return "";
    }
  };

  const handleGenerateRandomData = async () => {
    const randomEmpData = await generateRandomEmployee();
    if (randomEmpData) setFormData(randomEmpData);
  };

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(
      (prevFormData) =>
        ({
          ...prevFormData,
          [event.target.name]: event.target.value,
        } as EmployeeType)
    );
  };

  useEffect(() => setFormData(empPopupData), [empPopupAction]);

  return (
    <Dialog open={showEmpPopup} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>

      {empPopupAction === "delete" ? (
        <DialogContent>{deleteLabel}</DialogContent>
      ) : (
        <DialogContent>
          <Grid container spacing={2}>
            {empPopupAction === "edit" && (
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="id"
                  name="id"
                  label="ID"
                  type="text"
                  fullWidth
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={formData?.emp_id}
                />
              </Grid>
            )}
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                id="emp_name"
                name="emp_name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={formData?.emp_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                value={formData?.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                id="phone"
                name="phone"
                label="Phone"
                type="tel"
                fullWidth
                variant="standard"
                value={formData?.phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                id="emp_dob"
                name="emp_dob"
                label="Date of Birth"
                type="date"
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData?.emp_dob ? formatDate(formData?.emp_dob) : ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                id="address"
                name="address"
                label="Address"
                type="text"
                fullWidth
                variant="standard"
                value={formData?.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                id="designation"
                name="designation"
                label="Designation"
                type="text"
                fullWidth
                variant="standard"
                value={formData?.designation}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                id="salary"
                name="salary"
                label="Salary"
                type="number"
                fullWidth
                variant="standard"
                value={formData?.salary}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
      )}

      <DialogActions>
        {/* Generate random data button */}
        {empPopupAction === "add" && (
          <Tooltip title="Generate random data">
            <IconButton
              color="primary"
              disabled={loading}
              onClick={handleGenerateRandomData}
            >
              <DataObjectIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        )}

        {/* Cancel */}
        <Button
          onClick={() => handleClose(false)}
          variant={cancelBtnVariant}
          disabled={loading}
        >
          Cancel
        </Button>

        {/* Submit/Yes */}
        <Button
          onClick={onSubmit}
          variant={submitBtnVariant}
          loading={loading}
          disabled={loading}
        >
          {submitBtnLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
