import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { CircularProgress, Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";

const theme = createTheme();

const SignUp = () => {
  const { user, registerUser, isLoading, authError } = useAuth();
  // const location = useLocation();
  const history = useHistory();
  // const history = "/dashboard";
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // console.log(data)
  //   if (data.password !== data.password2) {
  //     alert('Your password did not match');
  //     return
  // }
    registerUser(data.email, data.password, data.fullname, history);
  };

  return (
    <ThemeProvider  theme={theme}>
                      <Grid container spacing={12} sx={{backgroundColor:"#780707", height:"104vh"}} item xs={12}>
                  <Grid item xs={4} sm={4}>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                  <Container className="singupbg" sx={{ color: "red", px:3, p:1,mt:5}} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
          Sign Up Now
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>

              <TextField
                margin="normal"
                {...register("fullname", { required: true })}
                fullWidth
                name="fullname"
                label="Full Name"
                type="fullname"
                id="fullname"
                required
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                {...register("email", { required: true })}
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                required
              />
              </Grid>
              <Grid item xs={12}>

              <TextField
                margin="normal"
                {...register("password", { required: true })}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                required
              />
{/* 
              <TextField
                margin="normal"
                {...register("password2", { required: true })}
                fullWidth
                name="passwor2"
                label="RE-Password"
                type="password"
                id="password"
                required
              /> */}
              </Grid>
            </Grid>
            {isLoading && <CircularProgress />}
            {user?.email && (
              <Alert severity="success">Login successfully!</Alert>
            )}
            {authError && <Alert severity="error">{authError}</Alert>}
            <Button
              type="submit"
              fullWidth
              className="buttondesign"
            
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Link
                  to="/login"
                  variant="body2"
                  sx={{ fontSize: [19, "!important"] }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Already have an account? <span >LOG IN NOW</span>
                </Link>
              </Grid>
            </Grid>

          </form>
        </Box>
      </Container>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                  </Grid>
                </Grid>

    </ThemeProvider>
  );
};
export default SignUp;
