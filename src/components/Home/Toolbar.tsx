import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../context/AuthContext";

const pages = ["Donate", "Upcoming Events"];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { isAuthenticated, logout } = useAuth();

  const authenticatedSettings = ["Account", "Logout"];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    console.log("User logged out");
    logout();
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        color: '#333',
        boxShadow: "none",
        border: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src="/static/images/logo.png"
            alt="cousins for carol logo"
            style={{ width: "85px" }}
          />
          <Typography
            variant="h4"
            align="left"
            sx={{
              fontWeight: 700, 
              color: '#333', 
              letterSpacing: 1.5 
            }}
          >
            Cousins for Carol
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", marginLeft: 5 }}>
            
              <Button
                sx={{
                  my: 2,
                  color: '#333',
                  fontSize:"16px",
                  display: "block",
                  fontWeight: 600,
                  textTransform: "none",
                  marginRight:"10px"
                }}
              >
               Donate {String.fromCodePoint(0x1F381)}
              </Button>
              <Button
                sx={{
                  my: 2,
                  color: '#333',
                  fontSize:"16px",
                  display: "block",
                  fontWeight: 600,
                  textTransform: "none",
                  marginLeft:"10px"
                }}
              >
               Upcoming Events {String.fromCodePoint(0x1F389)}
              </Button>
          </Box>

          {/* Authenticated User - Avatar and Menu */}
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {authenticatedSettings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={
                        setting === "Logout" ? handleLogout : handleCloseUserMenu
                      }
                    >
                      <Typography
                        sx={{ textAlign: "center", color: "black" }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              // Show "Get Started" button when not authenticated
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#8EE5F0" },
                }}
              >
                <Typography
                  variant="h6"
                  align="left"
                  sx={{
                    fontWeight: 700,
                    color: '#333', 
                  }}
                >
                  Get Started
                </Typography>
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
