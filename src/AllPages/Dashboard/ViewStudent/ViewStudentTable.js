import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, CircularProgress } from "@mui/material";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import StudentEdit from "../StudentEdit/StudentEdit";

const ViewStudent = (props) => {
  const { allStudent, setAllStudentList, allStudentList, setIsLoading, isLoading } =
    props;
  const handleDeleteButton = (id) => {
    // console.log(id);
    swal({
      title: "Do you want delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`https://fierce-waters-04653.herokuapp.com/addstudent/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              setIsLoading(true);
              // console.log(data)
              const remaining = allStudentList.filter(
                (booking) => booking._id !== id
              );
              setAllStudentList(remaining);
              setIsLoading(false);
              swal("You have Successfully Delete Student!", "Well Done!", {
                icon: "success",
                timer: 1220,
              });
            }
          });
      }
    });
  };

  return (
    <TableRow
      key={allStudent?.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
        {/* {allStudent?._id} */}
        #
      </TableCell>
      <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
        {allStudent?.name}
      </TableCell>
      <TableCell sx={{ fontSize: 18 }} align="center">
        {allStudent?.age}
      </TableCell>
      <TableCell sx={{ fontSize: 18 }} align="center">
        {allStudent?.school}
      </TableCell>
      <TableCell sx={{ fontSize: 18 }} align="center">
        {allStudent?.classa}
      </TableCell>
      <TableCell sx={{ fontSize: 18 }} align="center">
        {allStudent?.division}
      </TableCell>
      <TableCell sx={{ fontSize: 18 }} align="right">

          <Box
          >
            {allStudent?.status}
          </Box>

      </TableCell>
      {isLoading && <CircularProgress />}
      <TableCell sx={{ fontSize: 18 }} align="right">

          <Button
          >
           <StudentEdit isLoading={isLoading} key={allStudent?._id} allStudent={allStudent} setIsLoading={setIsLoading} ></StudentEdit>
          </Button>

        <Button
          type="submit"
          id="customize-delete-id-byme"
          // variant="contained"
          sx={{ m: 1, mb: 1, fontWeight: "bold" }}
          onClick={() => handleDeleteButton(allStudent?._id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ViewStudent;
