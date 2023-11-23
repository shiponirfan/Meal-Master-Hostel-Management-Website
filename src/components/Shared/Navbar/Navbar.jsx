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
import StoreIcon from "@mui/icons-material/Store";
import LogoutIcon from "@mui/icons-material/Logout";
const pages = ["Meals", "Upcoming Meals"];

function Navbar() {
  // TODO: Import User From useAuth
  const user = true;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{ mr: 2, display: { xs: "none", md: "inline-block" } }}
            >
              <Badge badgeContent={18} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {/* User Profile & Login Button */}
            {user ? (
              <Tooltip title="Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={user?.photoURL ? user.photoURL : ""}
                  />
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
              <Stack sx={{ px: 2, py: 0.75 }}>
                <Typography>
                  {user?.displayName ? user?.displayName : "User Name"}
                </Typography>
                <Typography variant="body2">
                  {user?.email ? user?.email : "User Email"}
                </Typography>
                <Divider sx={{ pt: 1 }} />
              </Stack>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#003049",
                  fontWeight: 500,
                }}
                to="/dashboard"
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <StoreIcon sx={{ mr: 1 }} />
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
              </Link>

              <MenuItem
                style={{
                  color: "#003049",
                }}
                onClick={handleCloseUserMenu}
              >
                <LogoutIcon sx={{ mr: 1 }} />
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
