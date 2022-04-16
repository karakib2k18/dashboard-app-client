import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { useForm } from "react-hook-form";
// import useAuth from "../../../hooks/useAuth";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ViewStudentTable from "./ViewStudentTable";

const SearchStudent = () => {
  const { register, handleSubmit } = useForm();
  // const { user } = useAuth();
  const [userSearchList, setUserSearchList] = React.useState();

  //send data to the server
  const onSubmit = (data) => {
    // console.log(data);

      fetch(`https://fierce-waters-04653.herokuapp.com/addstudent/`)
        .then((res) => res.json())
        .then((searchdatas) => {
          // console.log(data);
          const statusUpdate = searchdatas.filter((searchdata)=>((searchdata.age === data.age) && (searchdata.school === data.school) && (searchdata.classa === data.classa) && (searchdata.division === data.division) && (searchdata.name[0] === data.name[0]) ))
          setUserSearchList(statusUpdate);
        });
      };
      // console.log(userSearchList);

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
  //   const [value, setValue] = React.useState(null);

  return (
    <Box>
      <Container maxWidth="xl">
        <Grid container spacing={1}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid>
              <Grid className="displayfle" item sm={12} xs={12}>
                <Grid item xs={2} sm={2}>
                <Box sx={{ minWidth: 120 }}>
                    <TextField
                      {...register("name", { required: true })}
                      fullWidth
                      name="name"
                      label="Name"
                      type="text"
                      id="name"
                    />
                </Box>
                </Grid>
                <Grid item xs={1} sm={1}></Grid>

                <Grid item xs={2} sm={2}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={13}>13</MenuItem>
                        <MenuItem value={14}>14</MenuItem>
                        <MenuItem value={15}>15</MenuItem>

                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={1} sm={1}></Grid>
                <Grid item xs={2} sm={2}>
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
                <Grid item xs={1} sm={1}></Grid>
                <Grid item xs={2} sm={2}>
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
                <Grid item xs={1} sm={1}></Grid>
                <Grid item xs={2} sm={2}>
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
                <Grid item xs={1} sm={1}></Grid>
                <Grid item xs={2} sm={2}>
                  <Box sx={{ minWidth: 120 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ minWidth: 120, mt: 1, mb: 1, fontWeight: "bold" }}
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
        <Box sx={{ my: 1, boxShadow: 3}}>
        {userSearchList?.map((userSearch) => (
                  <ViewStudentTable
                    setAllStudentList={setUserSearchList}
                    allStudentList={userSearchList}
                    allStudent={userSearch}
                    key={userSearch._id}
                    // setIsLoading={setIsLoading}
                    // isLoading={isLoading}
                  ></ViewStudentTable>
                ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SearchStudent;
