import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, CircularProgress, FormControl } from "@mui/material";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";

const ViewStudent = (props) => {
  const { allStudent, setAllStudentList, allStudentList, setIsLoading, isLoading } =
    props;
    console.log(allStudent);
  const [updateForm, setupdateForm] = React.useState(false);
  const { register, handleSubmit, reset } = useForm();
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
    let updateStatus = { ...userUpdate };
    updateStatus.status = data.status;
    setUserUpdate(updateStatus);
    console.log(data);

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
          setIsLoading(true);
          swal("Change successfully!!", "done", "success", {
            button: false,
            timer: 1300,
          });
          reset();
          setUserUpdate({});
          setIsLoading(false);
        }
      });

    setupdateForm(false);
  };

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
        {!updateForm && (
          <Box
          >
            {allStudent?.status}
          </Box>
        )}

        {updateForm && (
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth>
                <Select
                  {...register("status", { required: true })}
                  labelId="status"
                  id="status"
                  label="status"
                  required
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
                </Select>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ m: 1, mb: 1, fontWeight: "bold" }}
                >
                  Update
                </Button>
              </FormControl>
            </form>
          </Box>
        )}
      </TableCell>
      {isLoading && <CircularProgress />}
      <TableCell sx={{ fontSize: 18 }} align="right">
        {!updateForm && (
          <Button
            type="submit"
            id="customize-delete-id-byme"
            // variant="contained"
            sx={{ m: 1, mb: 1, fontWeight: "bold" }}
            onClick={() => {
              setupdateForm(true);
              handleEditButton(allStudent?._id);
            }}
          >
            Edit
          </Button>
        )}

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
