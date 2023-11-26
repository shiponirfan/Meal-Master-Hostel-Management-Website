import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { NavLink } from "react-router-dom";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import HomeIcon from "@mui/icons-material/Home";
import SetMealIcon from "@mui/icons-material/SetMeal";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
export const adminListItems = (
  <React.Fragment>
    <NavLink
      style={{
        textDecoration: "none",
        fontWeight: 500,
        color: "#000000de",
      }}
      to="/dashboard"
    >
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </NavLink>

    <NavLink
      style={{
        textDecoration: "none",
        fontWeight: 500,
        color: "#000000de",
      }}
      to="/dashboard/admin"
    >
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Admin Profile" />
      </ListItemButton>
    </NavLink>

    <NavLink
      style={{
        textDecoration: "none",
        fontWeight: 500,
        color: "#000000de",
      }}
      to="/dashboard/manage-users"
    >
      <ListItemButton>
        <ListItemIcon>
          <PeopleAltIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Users" />
      </ListItemButton>
    </NavLink>

    <NavLink
      style={{
        textDecoration: "none",
        fontWeight: 500,
        color: "#000000de",
      }}
      to="/dashboard/add-meal"
    >
      <ListItemButton>
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <ListItemText primary="Add Meal" />
      </ListItemButton>
    </NavLink>

    <NavLink
      style={{
        textDecoration: "none",
        fontWeight: 500,
        color: "#000000de",
      }}
      to="/dashboard/admin-all-meals"
    >
      <ListItemButton>
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <ListItemText primary="All Meals" />
      </ListItemButton>
    </NavLink>

    <NavLink
      style={{
        textDecoration: "none",
        fontWeight: 500,
        color: "#000000de",
      }}
      to="/dashboard/all-reviews"
    >
      <ListItemButton>
        <ListItemIcon>
          <RateReviewIcon />
        </ListItemIcon>
        <ListItemText primary="All Reviews" />
      </ListItemButton>
    </NavLink>

    <NavLink
      style={{
        textDecoration: "none",
        fontWeight: 500,
        color: "#000000de",
      }}
      to="/dashboard/serve-meals"
    >
      <ListItemButton>
        <ListItemIcon>
          <SetMealIcon />
        </ListItemIcon>
        <ListItemText primary="Serve Meals" />
      </ListItemButton>
    </NavLink>

    <NavLink
      style={{
        textDecoration: "none",
        fontWeight: 500,
        color: "#000000de",
      }}
      to="/dashboard/admin-upcoming-meals"
    >
      <ListItemButton>
        <ListItemIcon>
          <KebabDiningIcon />
        </ListItemIcon>
        <ListItemText primary="Upcoming Meals" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);

export const mainListItems = (
  <React.Fragment>
    <NavLink
      style={{
        textDecoration: "none",
        fontWeight: 500,
        color: "#000000de",
      }}
      to="/dashboard"
    >
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </NavLink>

    <NavLink
      style={{
        textDecoration: "none",
        fontWeight: 500,
        color: "#000000de",
      }}
      to="/dashboard/profile"
    >
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItemButton>
    </NavLink>

    <NavLink
      style={{
        textDecoration: "none",
        fontWeight: 500,
        color: "#000000de",
      }}
      to="/dashboard/requested-meals"
    >
      <ListItemButton>
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <ListItemText primary="Requested Meals" />
      </ListItemButton>
    </NavLink>

    <NavLink
      style={{
        textDecoration: "none",
        fontWeight: 500,
        color: "#000000de",
      }}
      to="/dashboard/reviews"
    >
      <ListItemButton>
        <ListItemIcon>
          <RateReviewIcon />
        </ListItemIcon>
        <ListItemText primary="My Reviews" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
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
        <ListItemText primary="Home" />
      </ListItemButton>
    </NavLink>
    <NavLink
      style={{
        textDecoration: "none",
        fontWeight: 500,
        color: "#000000de",
      }}
      to="/meals"
    >
      <ListItemButton>
        <ListItemIcon>
          <RestaurantIcon />
        </ListItemIcon>
        <ListItemText primary="All Meals" />
      </ListItemButton>
    </NavLink>
    <NavLink
      style={{
        textDecoration: "none",
        fontWeight: 500,
        color: "#000000de",
      }}
      to="/upcoming-meals"
    >
      <ListItemButton>
        <ListItemIcon>
          <UpcomingIcon />
        </ListItemIcon>
        <ListItemText primary="All Upcoming Meals" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);
