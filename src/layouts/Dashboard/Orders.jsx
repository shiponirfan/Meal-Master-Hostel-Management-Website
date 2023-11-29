import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../api/useUserRole";
import useRequestedMeals from "../../api/useRequestedMeals";
import { Link } from "react-router-dom";

export default function Orders() {
  const { user } = useAuth();
  const [userRole] = useUserRole();
  let userEmail = "";
  if (userRole.userRole === "Admin") {
    userEmail = "";
  } else {
    userEmail = user?.email;
  }
  const [requestedMeal] = useRequestedMeals(userEmail, 1, 8, "");
  console.log(requestedMeal);
  return (
    <React.Fragment>
      <Title>
        {userRole.userRole === "Admin" ? "All Serve Meals" : "Requested Meals"}
      </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Meal Title</TableCell>
            <TableCell>Likes Count</TableCell>
            <TableCell>Reviews Count</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requestedMeal?.data?.map((row) => (
            <TableRow key={row?._id}>
              <TableCell>{row?.mealTitle}</TableCell>
              <TableCell>{row?.likes}</TableCell>
              <TableCell>{row?.reviews}</TableCell>
              <TableCell>{row?.requestedMealStatus?.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {userRole.userRole === "Admin" ? (
        <Link style={{ marginTop: "10px" }} to={"/dashboard/serve-meals"}>
          See more serve meals
        </Link>
      ) : (
        <Link style={{ marginTop: "10px" }} to={"/dashboard/requested-meals"}>
          See more requested meals
        </Link>
      )}
    </React.Fragment>
  );
}
