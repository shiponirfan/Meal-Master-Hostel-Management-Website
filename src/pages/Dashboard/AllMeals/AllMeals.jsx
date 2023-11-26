import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AwesomeButton } from "react-awesome-button";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useMeals from "../../../api/useMeals";
import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import CalendarViewDayOutlinedIcon from "@mui/icons-material/CalendarViewDayOutlined";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f77f00",
    color: theme.palette.common.white,
    fontSize: 18,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AllMeals() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [mealTypeTab, setMealTypeTab] = useState("");
  const mealType = mealTypeTab;
  const [meals, refetch, isLoading] = useMeals(mealType);

  const { mutate: mealDelete } = useMutation({
    mutationKey: ["mealDelete", user?.email],
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/meal/${id}`);
    },
    onSuccess: () => {
      refetch();
      Swal.fire({
        title: "Deleted",
        text: "Your file has been deleted.",
        icon: "success",
      });
    },
  });

  const handleMealDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Close",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mealDelete(id);
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 12 }}>
      <Table sx={{ minWidth: 700 }} aria-label="Requested Meals">
        <TableHead>
          <TableRow>
            <StyledTableCell>Meal Title</StyledTableCell>
            <StyledTableCell align="center">Likes</StyledTableCell>
            <StyledTableCell align="center">Reviews</StyledTableCell>
            <StyledTableCell align="center">Distributor Name</StyledTableCell>
            <StyledTableCell align="center">Distributor Email</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
            <StyledTableCell align="center">View Meal</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal) => (
            <StyledTableRow key={meal._id}>
              <StyledTableCell component="th" scope="row">
                {meal.mealTitle}
              </StyledTableCell>
              <StyledTableCell align="center">{meal.likes}</StyledTableCell>
              <StyledTableCell align="center">
                {meal.reviews?.length}
              </StyledTableCell>
              <StyledTableCell align="center">{meal.adminName}</StyledTableCell>
              <StyledTableCell align="center">
                {meal.adminEmail}
              </StyledTableCell>
              <StyledTableCell align="center">
              <Link to={`/dashboard/update-meal/${meal._id}`}>
                <AwesomeButton
                  type="secondary"
                  after={<CalendarViewDayOutlinedIcon />}
                >
                  UPDATE
                </AwesomeButton>
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">
                <AwesomeButton
                  onPress={() => handleMealDelete(meal._id)}
                  type="danger"
                  after={<DeleteOutlineIcon />}
                >
                  DELETE
                </AwesomeButton>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Link to={`/meal/${meal._id}`}>
                  <AwesomeButton
                    type="github"
                    after={<BrokenImageOutlinedIcon />}
                  >
                    Show Details
                  </AwesomeButton>
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
