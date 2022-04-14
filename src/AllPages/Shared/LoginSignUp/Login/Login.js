import * as React from "react";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";

const theme = createTheme();

const Login = () => {
  const { user, loginUser, isLoading, authError } = useAuth();
  const location = useLocation();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    loginUser(data.email, data.password, location, history);
  };

  return (

    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={12}
        sx={{ backgroundColor: "#780707", height: "104vh" }}
        item
        xs={12}
      >
        <Grid item xs={4} sm={4}></Grid>
        <Grid item xs={4} sm={4}>
          <Container
            className="singupbg"
            sx={{ color: "red", px: 3, p: 1, mt: 5 }}
            component="main"
            maxWidth="xs"
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: "bold" }}
              >
                Sign In Now
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  {...register("email", { required: true })}
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  required
                />
                {/* {errors.email && (
              
              <Alert fullWidth severity="error"> Email is required</Alert>
            )} */}

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
                {/* {errors.password && (
               <Alert fullWidth severity="error">  Password is required</Alert>
            )} */}
                {isLoading && <CircularProgress />}
                {user?.email && (
                  <Alert severity="success">Login successfully!</Alert>
                )}
                {authError && <Alert severity="error">{authError}</Alert>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="buttondesign"
                  sx={{ mt: 1, mb: 1, fontWeight: "bold" }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link
                      to="/signup"
                      variant="body2"
                      style={{ textDecoration: "none", color: "black" }}
                      sx={{ pt: 3 }}
                    >
                      {"Create a New Account?"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={4} sm={4}></Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Login;
