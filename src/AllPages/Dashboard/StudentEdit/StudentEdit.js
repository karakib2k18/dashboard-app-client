import * as React from "react";
import TextField from "@mui/material/TextField";
// import DatePicker from '@mui/lab/DatePicker';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { CircularProgress } from "@mui/material";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function StudentEdit(props) {
  const [open, setOpen] = React.useState(false);

  const {isLoading, allStudent, setIsLoading } = props;
  //   console.log(allStudent);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { register, handleSubmit, reset } = useForm();

  //   const [updateForm, setupdateForm] = React.useState(false);

  const [userUpdate, setUserUpdate] = React.useState({});

  const handleEditButton = (id) => {
    // reset();
    fetch(`https://fierce-waters-04653.herokuapp.com/addstudent/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // const statusUpdate = allBookings.filter(()=>allbook.data === data.status)
        setUserUpdate(data);
      });
  };

  const onSubmit = (data) => {
    console.log(userUpdate._id);
    // data._id = userUpdate._id;
    let updateStatus = { ...userUpdate };
    updateStatus.name = data.name;
    updateStatus.age = data.age;
    updateStatus.school = data.school;
    updateStatus.classa = data.classa;
    updateStatus.division = data.division;
    updateStatus.status = data.status;
    setUserUpdate(updateStatus);
    console.log(data);

    setIsLoading(true);
    const url = `https://fierce-waters-04653.herokuapp.com/addstudent/${data._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        // 'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(updateStatus),
    })
      .then((res) => res.json())
      .then((datan) => {
        if (datan.modifiedCount > 0) {
          swal("Change successfully!!", "done", "success", {
            button: false,
            timer: 1300,
          });
          reset();
          setUserUpdate({});
          setIsLoading(false);
          handleClose();
        }
      });
  };

  const [division, setDivision] = React.useState("");
  const handleChangedivision = (event) => {
    setDivision(event.target.value);
  };

  const [school, setSchool] = React.useState("");
  const handleChangeSchool = (event) => {
    setSchool(event.target.value);
  };
  const [classa, setClassa] = React.useState("");
  const handleChangeClassa = (event) => {
    setClassa(event.target.value);
  };
  const [age, setAge] = React.useState("");
  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };
  const [status, setstatus] = React.useState("");
  const handleChangestatus = (event) => {
    setstatus(event.target.value);
  };
  const [value, setValue] = React.useState(null);
  return (
    <div>
      <Button
        onClick={() => {
          handleClickOpen();
          handleEditButton(allStudent?._id);
        }}
        type="submit"
        variant="outlined"
        //  onClick={handleClickOpen}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Edit Student Details
          {isLoading && <CircularProgress />}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={2}>
          
        </Grid> */}
              <Grid item xs={12} sm={12}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl fullWidth>
                    <Grid container spacing={2}>
                      <Grid className="displayfle" item xs={12}>
                        <Grid item xs={3} sm={3}>
                          Full Name
                        </Grid>
                        <Grid item xs={9} sm={9}>
                          <TextField
                            margin="normal"
                            {...register("name", { required: true })}
                            fullWidth
                            name="name"
                            label="Name"
                            type="text"
                            id="name"
                            defaultValue={allStudent?.name}
                          />
                        </Grid>
                      </Grid>
                      <Grid className="displayfle" item xs={12}>
                        <Grid item xs={3} sm={3}>
                          Birth Date
                        </Grid>
                        <Grid item xs={9} sm={9}>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DatePicker
                                  {...register("datepiker")}
                                  //  {...register("datepiker", { required: true })}
                                  value={value}
                                  onChange={(newValue) => {
                                    setValue(newValue);
                                  }}
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                />
                              </LocalizationProvider>
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>

                      <Grid className="displayfle" item xs={12}>
                        <Grid item xs={3} sm={3}>
                          Age
                        </Grid>
                        <Grid item xs={9} sm={9}>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                {allStudent?.age}
                              </InputLabel>
                              <Select
                                {...register("age", { required: true })}
                                labelId="age"
                                id="age"
                                value={age}
                                label="age"
                                onChange={handleChangeAge}
                                defaultValue={allStudent?.age}
                                required
                              >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                                <MenuItem value={13}>13</MenuItem>
                                <MenuItem value={14}>14</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={16}>16</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>

                      <Grid className="displayfle" item xs={12}>
                        <Grid item xs={3} sm={3}>
                          School
                        </Grid>
                        <Grid item xs={9} sm={9}>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                {allStudent?.school}
                              </InputLabel>
                              <Select
                                {...register("school", { required: true })}
                                labelId="school"
                                id="school"
                                value={school}
                                label="school"
                                onChange={handleChangeSchool}
                                required
                              >
                                <MenuItem value="Model School">
                                  Model School
                                </MenuItem>
                                <MenuItem value="Primary School">
                                  Primary School
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid className="displayfle" item xs={12}>
                        <Grid item xs={3} sm={3}>
                          Class
                        </Grid>
                        <Grid item xs={9} sm={9}>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                {allStudent?.classa}
                              </InputLabel>
                              <Select
                                {...register("classa", { required: true })}
                                labelId="classa"
                                id="class"
                                value={classa}
                                label="classa"
                                onChange={handleChangeClassa}
                                required
                              >
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid className="displayfle" item xs={12}>
                        <Grid item xs={3} sm={3}>
                          Division
                        </Grid>
                        <Grid item xs={9} sm={9}>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                {allStudent?.division}
                              </InputLabel>
                              <Select
                                {...register("division", { required: true })}
                                labelId="division"
                                id="division"
                                value={division}
                                label="division"
                                onChange={handleChangedivision}
                                required
                              >
                                <MenuItem value="A">A</MenuItem>
                                <MenuItem value="B">B</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid className="displayfle" item xs={12}>
                        <Grid item xs={3} sm={3}>
                          Status
                        </Grid>
                        <Grid item xs={9} sm={9}>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                {allStudent?.status}
                              </InputLabel>
                              <Select
                                {...register("status", { required: true })}
                                labelId="status"
                                id="status"
                                label="status"
                                value={status}
                                onChange={handleChangestatus}
                                defaultValue={allStudent?.status}
                                required
                              >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="InActive">InActive</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>

                      <Grid className="displayfle" item xs={12}>
                        <Grid item xs={3} sm={3}></Grid>
                        <Grid item xs={9} sm={9}>
                          <Box sx={{ minWidth: 120 }}>
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{
                                minWidth: 120,
                                mt: 1,
                                mb: 1,
                                fontWeight: "bold",
                              }}
                              style={{
                                backgroundColor: "#750606",
                                color: "white",
                              }}
                            >
                              Update
                            </Button>
                            
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </FormControl>
                </form>
              </Grid>
              {/* <Grid item xs={12} sm={3}></Grid> */}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
