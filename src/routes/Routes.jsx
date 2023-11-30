import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Meals from "../pages/Meals/Meals";
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard/Dashboard";
import MyProﬁle from "../pages/Dashboard/MyProﬁle/MyProﬁle";
import MyReviews from "../pages/Dashboard/MyReviews/MyReviews";
import RequestedMeals from "../pages/Dashboard/RequestedMeals.jsx/RequestedMeals";
import MealDetails from "../pages/MealDetails/MealDetails";
import MembershipPage from "../pages/MembershipPage/MembershipPage";
import Checkout from "../pages/Checkout/Checkout";
import AdminRoute from "./AdminRoute";
import AdminProﬁle from "../pages/Dashboard/AdminProﬁle/AdminProﬁle";
import ManageUsers from "./../pages/Dashboard/ManageUsers/ManageUsers";
import AddMeal from "./../pages/Dashboard/AddMeal/AddMeal";
import AllReviews from "../pages/Dashboard/AllReviews/AllReviews";
import ServeMeals from "../pages/Dashboard/ServeMeals/ServeMeals";
import AdminUpcomingMeals from "../pages/Dashboard/AdminUpcomingMeals/AdminUpcomingMeals";
import AllMeals from "./../pages/Dashboard/AllMeals/AllMeals";
import UpdateMeal from "../pages/Dashboard/UpdateMeal/UpdateMeal";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "meals",
        element: <Meals />,
      },
      {
        path: "upcoming-meals",
        element: <UpcomingMeals />,
      },
      {
        path: "meal/:id",
        element: <MealDetails />,
      },
      {
        path: "membership",
        element: (
          <PrivateRoute>
            <MembershipPage />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // User Dashboard Routes
      {
        path: "profile",
        element: <MyProﬁle />,
      },
      {
        path: "reviews",
        element: <MyReviews />,
      },
      {
        path: "requested-meals",
        element: <RequestedMeals />,
      },
      // Admin Dashboard Routes
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminProﬁle />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "add-meal",
        element: (
          <AdminRoute>
            <AddMeal />
          </AdminRoute>
        ),
      },
      {
        path: "admin-all-meals",
        element: (
          <AdminRoute>
            <AllMeals />
          </AdminRoute>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <AdminRoute>
            <AllReviews />
          </AdminRoute>
        ),
      },
      {
        path: "serve-meals",
        element: (
          <AdminRoute>
            <ServeMeals />
          </AdminRoute>
        ),
      },
      {
        path: "admin-upcoming-meals",
        element: (
          <AdminRoute>
            <AdminUpcomingMeals />
          </AdminRoute>
        ),
      },
      {
        path: "update-meal/:id",
        element: (
          <AdminRoute>
            <UpdateMeal />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default Routes;
