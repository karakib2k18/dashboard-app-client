import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress, Grid, Typography } from "@mui/material";

import ViewStudentTable from "./ViewStudentTable";
import { Box } from "@mui/system";

const ViewStudent = () => {
  const [allStudentList, setAllStudentList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("http://localhost:5000/addstudent")
      .then((response) => response.json())
      .then((json) => {
        setAllStudentList(json);
        setIsLoading(false);
      });
  }, [isLoading]);
  const tableheader = [
    { name: "ID'V" },
    { name: "Home" },
    { name: "Age" },
    { name: "School" },
    { name: "Class" },
    { name: "Division" },
    { name: "Status" },
  ];

  return (
    <Box>
      <Typography gutterBottom variant="h5" component="div">
        View Student
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={1}></Grid>
        <Grid item xs={12} sm={12}>
          <TableContainer component={Paper}>
            <Table size="large" aria-label="a dense table">
              {isLoading && <CircularProgress />}
              <TableHead sx={{ mb: -5 }} className="theaddesign">
                <TableRow>
                  {tableheader.map((nav, index) => (
                    <TableCell align="center" sx={{ fontSize: 22, color: 'white'}}>
                      {nav.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {allStudentList?.map((allStudent) => (
                  <ViewStudentTable
                    setAllStudentList={setAllStudentList}
                    allStudentList={allStudentList}
                    allStudent={allStudent}
                    key={allStudent._id}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                  ></ViewStudentTable>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={1}></Grid>
      </Grid>
    </Box>
  );
};

export default ViewStudent;
