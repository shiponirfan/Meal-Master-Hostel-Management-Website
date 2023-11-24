import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { Badge, Divider, Stack } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const pages = ["Meals", "Upcoming Meals"];

import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import styled from "@emotion/styled";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Navbar() {
  // TODO: Import User From useAuth
  const user = true;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        background: "white",
        py: 2,
      }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 6 }}>
            <Link to="/">
              <img style={{ width: "200px" }} src={logo} alt="logo" />
            </Link>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <NavLink
                    style={{ textDecoration: "none", color: "#003049" }}
                    to={`/${page.toLowerCase().split(" ").join("-")}`}
                  >
                    {page}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Box
            justifyContent={"center"}
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, mr: 1 }}
          >
            <Link to="/">
              <img style={{ width: "180px" }} src={logo} alt="logo" />
            </Link>
          </Box>

          {/* Main Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              className="navbar-menu"
              sx={{ textTransform: "none", fontSize: 18 }}
            >
              <NavLink
                style={{
                  textDecoration: "none",
                  fontWeight: 500,
                }}
                to="/"
              >
                Home
              </NavLink>
            </Button>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                className="navbar-menu"
                sx={{ textTransform: "none", fontSize: 18 }}
              >
                <NavLink
                  style={{
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                  to={`/${page.toLowerCase().split(" ").join("-")}`}
                >
                  {page}
                </NavLink>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* Cart Icon */}
            <IconButton sx={{ mr: 1 }} aria-label="cart">
              <StyledBadge badgeContent={4} color="primary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>

            {/* User Profile & Login Button */}
            {user ? (
              <Tooltip title="Profile">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    alt="user profile"
                    src={user?.photoURL ? user.photoURL : ""}
                  ></Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Link to="/login">
                <Button
                  variant="contained"
                  sx={{ color: "#fff", textTransform: "none", fontSize: 18 }}
                >
                  Join Us
                </Button>
              </Link>
            )}

            {/* User Profile Dropdown */}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{ px: 2, py: 0.75 }}
              >
                <Avatar
                  alt="user profile"
                  src={user?.photoURL ? user.photoURL : ""}
                ></Avatar>
                <Stack>
                  <Typography>
                    {user?.displayName ? user?.displayName : "User Name"}
                  </Typography>
                  <Typography variant="body2">
                    {user?.email ? user?.email : "User Email"}
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              <Link
                style={{
                  textDecoration: "none",
                  color: "rgba(0, 0, 0, 0.87)",
                }}
                to="/dashboard"
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Dashboard
                </MenuItem>
              </Link>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
