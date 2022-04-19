import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import DownloadIcon from "@mui/icons-material/Download";

import ViewStudentTable from "./ViewStudentTable";
import { Box } from "@mui/system";
import SearchStudent from "./SearchStudent";

const ViewStudent = () => {
  const [allStudentList, setAllStudentList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentPage, setCurrentPage] =  React.useState(0);

  const [studentCount, setStudentCount] = React.useState(0);
  // const handlePagination = (num) => {
  //   setCurrentPage(num);
  // };
  const perPageItem = 5;

  React.useEffect(() => {
    fetch(`https://fierce-waters-04653.herokuapp.com/addstudent?currentPage=${currentPage}&&perPageItem=${perPageItem}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStudentList(data.students);
        setStudentCount(Math.ceil(data.count / perPageItem));
        setIsLoading(false);
        console.log(data.students);
      });
  }, [isLoading, currentPage]);
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
      <Typography sx={{ mb: 3 }} style={{color: 'red' }} gutterBottom variant="h5" component="div">
        {/* View Student {currentPage} {perPageItem} */}
        View Student
      </Typography>

      <SearchStudent></SearchStudent>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={1}></Grid>
        <Grid item xs={12} sm={12}>
          <TableContainer component={Paper}>
            <Table size="large" aria-label="a dense table">
              {isLoading && <CircularProgress />}
              <TableHead sx={{ mb: -5 }} className="theaddesign">
                <TableRow>
                  {tableheader.map((nav, index) => (
                    <TableCell
                      align="center"
                      sx={{ fontSize: 22, color: "white" }}
                    >
                      {nav.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {allStudentList?.map((allStudent,index) => (
                  <ViewStudentTable
                    setAllStudentList={setAllStudentList}
                    allStudentList={allStudentList}
                    allStudent={allStudent}
                    key={allStudent._id}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                    index={index+(currentPage*perPageItem)}
                  ></ViewStudentTable>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={1}></Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6} md={6} sm={6}>
          <Button
            type="submit"
            variant="contained"
            sx={{ minWidth: 120, mt: 1, mb: 1, fontWeight: "bold" }}
            style={{ backgroundColor: "#750606", color: "white" }}
          >
            Download Excel <DownloadIcon></DownloadIcon> It's not working now
          </Button>
        </Grid>
        <Grid item xs={6} md={6} sm={6} style={{ display: "flex", justifyContent:"right"}}>
          <Stack spacing={2}>
            <Pagination
              count={studentCount}
              color="secondary"
              variant="outlined"
              shape="rounded"
              onChange={(e, value) => setCurrentPage(value-1)}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewStudent;
