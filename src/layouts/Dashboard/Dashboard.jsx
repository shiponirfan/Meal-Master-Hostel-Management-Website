import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { adminListItems, mainListItems, secondaryListItems } from "./listItems";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import useUserRole from "../../api/useUserRole";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import {
  Avatar,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import logo from "../../assets/logo.png";
import Orders from "./Orders";
import Deposits from "./Deposits";
import Chart from "./Chart";
import { useTheme } from "@emotion/react";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
import useMediaQuery from "@mui/material/useMediaQuery";
import { Helmet } from "react-helmet-async";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [userRole, isUserRoleLoading] = useUserRole();
  const location = useLocation();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    setOpen(isMd);
  }, [isMd]);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  if (loading || isUserRoleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Helmet>
        <title>Dashboard - Meal Master</title>
      </Helmet>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="white"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="white"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={2} color="info">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Tooltip title="Profile">
            <Avatar
              sx={{ ml: 1 }}
              alt="user profile"
              src={user?.photoURL ? user.photoURL : ""}
            ></Avatar>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <Box>
            <img style={{ width: "160px" }} src={logo} alt="logo" />
          </Box>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {user && userRole.userRole === "Admin"
            ? adminListItems
            : user && mainListItems}
          <Divider sx={{ my: 1 }} />
          {user && userRole.userRole === "Admin" ? (
            <NavLink
              style={{
                textDecoration: "none",
                fontWeight: 500,
                color: "#000000de",
              }}
              to="/"
            >
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Back To Home" />
              </ListItemButton>
            </NavLink>
          ) : (
            user && secondaryListItems
          )}
        </List>
      </Drawer>

      {location.pathname === "/dashboard" ? (
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl">
            <Stack justifyContent={'center'} alignItems={'center'} sx={{minHeight: "calc(100vh - 64px)"}}>
            <Grid container spacing={3} sx={{my: 3}}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                className="dashboard-container"
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Total Price */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                className="dashboard-container"
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Requested Meals */}
              <Grid item xs={12}>
                <Paper className="dashboard-container" sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
            </Stack>
          </Container>
        </Box>
      ) : (
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl">
            <Outlet />
          </Container>
        </Box>
      )}
    </Box>
  );
}
