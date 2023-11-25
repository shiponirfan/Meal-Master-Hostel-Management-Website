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

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
      // TODO: Admin Dashboard Routes
    ],
  },
]);

export default Routes;
