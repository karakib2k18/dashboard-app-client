import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
// import Toolbar from "@mui/material/Toolbar";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { Button } from "@mui/material";
import ViewStudent from "../ViewStudent/ViewStudent";
import AddStudent from "../AddStudent/AddStudent";
import useAuth from "../../../hooks/useAuth";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const drawerWidth = 200;

function Dashboard(props) {
  const { user } = useAuth();
  // const { window } = props;
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  let { path, url } = useRouteMatch();

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  const drawer = (
    <Box >
      {/* <Toolbar />
      <Divider /> */}

      <List sx={{ p: 2 }}>
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
          </Box>
        )}
      </List>
      <Divider />
    </Box>
  );
  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ m: 9, boxShadow: 3, display: "flex" }}>
      <CssBaseline />

      {/* <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
        className="borderright"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
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
          <Box
            // style={{ backgroundColor: "transparent", position: "relative" }}
            sx={{ mt: 7, boxShadow: 3 }}
          >
            {drawer}
          </Box>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Box
            // style={{ backgroundColor: "transparent", position: "relative" }}
            sx={{ mt: 7, boxShadow: 3 }}
          >
            {drawer}
          </Box>
        </Drawer>
      </Box> */}


          <Box
            // style={{ backgroundColor: "transparent", position: "relative" }}
            // sx={{ mt: 7, boxShadow: 3 }}
            className="borderright"
          >
            {drawer}
          </Box>
      <Box
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

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
