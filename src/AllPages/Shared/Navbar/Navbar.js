import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { NavLink } from "react-router-dom";
import Container from "@mui/material/Container";
import useAuth from "../../../hooks/useAuth";
import { Avatar } from "@mui/material";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [anchorElp, setAnchorElp] = React.useState(null);

  const handleMenup = (event) => {
    setAnchorElp(event.currentTarget);
  };

  const handleClosep = () => {
    setAnchorElp(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="navbarcolor" position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              TUNICALABS MEDIA
            </Typography>

            {/* for mobile version */}

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
            
            </Box>


            <Box sx={{ flexGrow: 1 }}></Box>


            {/* if login the picture and details show in desktop */}
            {(user?.displayName || user?.email) && (
              <Box>
                <Avatar
                  alt="Remy Sharp"
                  src={user?.photoURL}
                  onClick={handleMenup}
                />
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElp}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElp)}
                  onClose={handleClosep}
                >
                  <MenuItem onClick={handleClosep}> {user?.displayName}</MenuItem>
                  <MenuItem onClick={handleClosep}>{user?.email}</MenuItem>
                  <NavLink
                        style={{ textDecoration: "none", color: "black" }}
                        to="/dashboard"
                      >
                        <MenuItem>
                          <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            onClick={logout}
                          >
                            Logout
                          </Typography>
                        </MenuItem>
                      </NavLink>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default Navbar;
