import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { Button } from "@mui/material";
import ViewStudent from "../ViewStudent/ViewStudent";
import AddStudent from "../AddStudent/AddStudent";
import useAuth from "../../../hooks/useAuth";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function Dashboard(props: Props) {
  const { user, logout } = useAuth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let { path, url } = useRouteMatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      {/* <Toolbar /> */}
      {/* <Divider /> */}
      <List sx={{ py: 2 }} style={{ width: 240 }}>
        {(user?.displayName || user?.email) && (
          <Box>
            {" "}
            {/* singlelink */}
            <Link style={{ textDecoration: "none" }} to={`${url}/ViewStudent`}>
              <Button
                type="submit"
                fullWidth
                // variant="contained"
                sx={{ mt: 1, mb: 1, fontWeight: "bold" }}
              >
                <PeopleOutlineIcon></PeopleOutlineIcon>
                <Box sx={{ px: 2 }}> View Student</Box>
              </Button>
            </Link>
            {/* singlelink */}
            <Link style={{ textDecoration: "none" }} to={`${url}/AddStudent`}>
              <Button
                type="submit"
                fullWidth
                // variant="contained"
                sx={{ mt: 1, mb: 1, fontWeight: "bold" }}
              >
                <AccountBoxIcon></AccountBoxIcon>
                <Box sx={{ px: 2 }}> Add Student</Box>
              </Button>
            </Link>


            <Link style={{ textDecoration: "none" }} to="/login">
              <Button
                type="submit"
                fullWidth
                onClick={logout}
                sx={{ mt: 1, mb: 1, fontWeight: "bold" }}
              >
                <AccountBoxIcon></AccountBoxIcon>
                <Box sx={{ px: 2 }}>Logout</Box>
              </Button>
            </Link>
          </Box>
        )}
      </List>
      <Divider />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    // <Box sx={{ m: 9, boxShadow: 3, display: "flex" }}>
    <Box sx={{ m: { md: 9 }, boxShadow: { md: 3 }, display: "flex" }}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className="navbarcolor"
      >
        <Toolbar sx={{ display: { md: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* FIRST BOX FOR LAPTOP */}
      <Box
        // style={{ backgroundColor: "transparent", position: "relative" }}
        //  sx={{ mt: 7, boxShadow: 3 }}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        className="borderright"
      >
        {drawer}
      </Box>

{/* // FOR MOBILE */}
<Box>
<Drawer
        container={container}
        // variant="temporary"
        open={mobileOpen}
        // className="borderright"
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
</Box>

      {/* DIVIDE UPPE BOX IN TWO PART FOR MOBILE AND DESKTOP */}
      <Box
        // className="borderright"
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* <Toolbar /> */}
        <Switch>
          <Route exact path={path}>
            <ViewStudent></ViewStudent>
          </Route>
          <Route path={`${path}/ViewStudent`}>
            <ViewStudent />
          </Route>
          <Route path={`${path}/AddStudent`}>
            <AddStudent />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
