import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { CircularProgress, Container } from "@mui/material";
import { useForm } from "react-hook-form";
// import useAuth from "../../../hooks/useAuth";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ViewStudentTable from "./ViewStudentTable";

const SearchStudent = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const [userSearchList, setUserSearchList] = React.useState();

  //send data to the server
  const onSubmit = (data) => {
    // console.log(data);
    setIsLoading(true);

    fetch(`https://fierce-waters-04653.herokuapp.com/addstudent/`)
      .then((res) => res.json())
      .then((founddatas) => {
        // console.log(data);
        const searchdatas = founddatas.students;
        const statusUpdate = searchdatas.filter(
          (searchdata) =>
            searchdata.age === data.age ||
            searchdata.school === data.school ||
            searchdata.classa === data.classa ||
            searchdata.division === data.division ||
            searchdata.name[0] === data.name[0]
        );
        setUserSearchList(statusUpdate);
        setIsLoading(false);
      });
  };

  console.log(userSearchList);

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

  return (
    <Box>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sm={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid>
                <Grid className="displayfle" item sm={12} xs={12}>
                  <Grid item xs={2} md={2} sm={2}>
                    <Box sx={{ minWidth: 160 }}>
                      <TextField
                        {...register("name")}
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
                    <Box sx={{ minWidth: 160 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Age
                        </InputLabel>
                        <Select
                          {...register("age")}
                          labelId="age"
                          id="age"
                          value={age}
                          label="age"
                          onChange={handleChangeAge}
                        >
                          <MenuItem value="none">None</MenuItem>
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
                    <Box sx={{ minWidth: 160 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          School
                        </InputLabel>
                        <Select
                          {...register("school")}
                          labelId="school"
                          id="school"
                          value={school}
                          label="school"
                          onChange={handleChangeSchool}
                        >
                          <MenuItem value="none">None</MenuItem>
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
                    <Box sx={{ minWidth: 160 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Class
                        </InputLabel>
                        <Select
                          {...register("classa")}
                          labelId="classa"
                          id="classa"
                          value={classa}
                          label="classa"
                          onChange={handleChangeClassa}
                        >
                          <MenuItem value="none">None</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={1} sm={1}></Grid>
                  <Grid item xs={2} sm={2}>
                    <Box sx={{ minWidth: 160 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Division
                        </InputLabel>
                        <Select
                          {...register("division")}
                          labelId="division"
                          id="division"
                          value={division}
                          label="division"
                          onChange={handleChangedivision}
                        >
                          <MenuItem value="none">None</MenuItem>
                          <MenuItem value="A">A</MenuItem>
                          <MenuItem value="B">B</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={1} sm={1}></Grid>
                  <Grid item xs={2} sm={2}>
                    <Box sx={{ minWidth: 160 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ minWidth: 160, mt: 2, mb: 2, fontWeight: "bold" }}
                        style={{ backgroundColor: "#750606", color: "white" }}
                      >
                        Search
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <Box sx={{ my: 1, boxShadow: 3 }}>
            {userSearchList?.map((userSearch, index) => (
              <ViewStudentTable
                setAllStudentList={setUserSearchList}
                allStudentList={userSearchList}
                allStudent={userSearch}
                index={index}
                key={userSearch._id}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              ></ViewStudentTable>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SearchStudent;
