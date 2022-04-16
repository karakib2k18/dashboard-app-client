import * as React from "react";
import TextField from "@mui/material/TextField";
// import DatePicker from '@mui/lab/DatePicker';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import useAuth from "../../../hooks/useAuth";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import StudentEdit from "../StudentEdit/StudentEdit";

const AddStudent = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();

  //send data to the server
  const onSubmit = (data) => {
    console.log(data);
    swal({
      title: "Do you want to add a Student?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch("https://fierce-waters-04653.herokuapp.com/addstudent", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.insertedId) {
              //   console.log(data);
              swal("You have Added a Student", "Well Done!", {
                icon: "success",
                timer: 1300,
              });
              reset();
              //   history.push("/dashboard");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  };
  // const [ratings, setRatings] = React.useState("");

  // const handleChange = (event) => {
  //   setRatings(event.target.value);
  // };
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
    <Box>
      <Container maxWidth="lg">
        <Typography gutterBottom variant="h5" component="div">
          ADD A NEW STUDENT
        </Typography>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={2}>
          
        </Grid> */}
          <Grid item xs={12} sm={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid className="displayfle" item xs={12}>
                  <Grid item xs={3} sm={3}>
                    Full Name
                  </Grid>
                  <Grid item xs={9} sm={9}>
                    {user?.displayName && (
                      <TextField
                        margin="normal"
                        {...register("name", { required: true })}
                        fullWidth
                        name="name"
                        label="Name"
                        type="text"
                        id="name"
                        defaultValue={user?.displayName}
                      />
                    )}
                  </Grid>
                </Grid>
                <Grid className="displayfle" item xs={12}>
                  <Grid item xs={3} sm={3}>
                    Birth Date
                  </Grid>
                  <Grid item xs={9} sm={9}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                             {...register("datepiker")}
                            //  {...register("datepiker", { required: true })}
                            value={value}
                            onChange={(newValue) => {
                              setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
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
                        Age
                      </InputLabel>
                      <Select
                        {...register("age", { required: true })}
                        labelId="age"
                        id="age"
                        value={age}
                        label="age"
                        onChange={handleChangeAge}
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
                          School
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
                          <MenuItem value="Model School">Model School</MenuItem>
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
                        Class
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
                        Division
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
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Active"
                        name="radio-buttons-group"
                        {...register("status", { required: true })}
                        labelId="status"
                        id="status"
                        value={status}
                        label="status"
                        onChange={handleChangestatus}
                        required
                        row
                      >
                        <FormControlLabel
                          value="Active"
                          control={<Radio />}
                          label="Active"
                        />
                        <FormControlLabel
                          value="InActive"
                          control={<Radio />}
                          label="InActive"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  </Grid>
                </Grid>
                <Grid className="displayfle" item xs={12}>
                  <Grid item xs={3} sm={3}>
                    
                  </Grid>
                  <Grid item xs={9} sm={9}>
                  <Box sx={{ minWidth: 120 }}>
                  <Button
                type="submit"
                
                variant="contained"
                sx={{minWidth: 120 , mt: 1, mb: 1, fontWeight: "bold" }}
                style={{ backgroundColor: "#750606", color: "white" }}
              >
                Save
              </Button>
                  </Box>
                  </Grid>
                </Grid>

              </Grid>

            </form>
          </Grid>
          <Grid item xs={12} sm={3}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddStudent;
