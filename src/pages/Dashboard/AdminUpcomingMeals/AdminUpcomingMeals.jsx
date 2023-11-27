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
import { useState } from "react";
import CalendarViewDayOutlinedIcon from "@mui/icons-material/CalendarViewDayOutlined";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useUpcomingMeals from "../../../api/useUpcomingMeals";
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

export default function AdminUpcomingMeals() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [mealTypeTab, setMealTypeTab] = useState("");
  const mealType = mealTypeTab;
  const [upcomingMeals, refetch, isLoading] = useUpcomingMeals(mealType);

  const { mutate: mealPublish } = useMutation({
    mutationKey: ["mealPublish", user?.email],
    mutationFn: async (id) => {
      return await axiosSecure.post(`/upcoming-meal-publish/${id}`);
    },
    onSuccess: () => {
      refetch();
      Swal.fire({
        title: "Published",
        text: "Meal has been published.",
        icon: "success",
      });
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleMealLikeCount = () => {
    Swal.fire({
      title: "More Like Needed",
      text: "Up To 10 Likes Need To Publish The Meal",
      icon: "info",
    });
  };

  const handleMealPublish = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Close",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Publish it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mealPublish(id);
      }
    });
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 12 }}>
      <Table sx={{ minWidth: 700 }} aria-label="Requested Meals">
        <TableHead>
          <TableRow>
            <StyledTableCell>Meal Title</StyledTableCell>
            <StyledTableCell align="center">Likes</StyledTableCell>
            <StyledTableCell align="center">Reviews</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Meal Type</StyledTableCell>
            <StyledTableCell align="center">Distributor Name</StyledTableCell>
            <StyledTableCell align="center">Distributor Email</StyledTableCell>
            <StyledTableCell align="center">Publish</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {upcomingMeals.map((meal) => (
            <StyledTableRow key={meal._id}>
              <StyledTableCell component="th" scope="row">
                {meal.mealTitle}
              </StyledTableCell>
              <StyledTableCell align="center">{meal.likes}</StyledTableCell>
              <StyledTableCell align="center">
                {meal.reviews?.length}
              </StyledTableCell>
              <StyledTableCell align="center">${meal.price}</StyledTableCell>
              <StyledTableCell align="center">{meal.mealType}</StyledTableCell>
              <StyledTableCell align="center">{meal.adminName}</StyledTableCell>
              <StyledTableCell align="center">
                {meal.adminEmail}
              </StyledTableCell>
              <StyledTableCell align="center">
                {meal?.likes >= 10 ? (
                  <AwesomeButton
                    onPress={() => handleMealPublish(meal._id)}
                    type="secondary"
                    after={<CalendarViewDayOutlinedIcon />}
                  >
                    PUBLISH
                  </AwesomeButton>
                ) : (
                  <AwesomeButton
                    onPress={() => handleMealLikeCount(meal._id)}
                    type="secondary"
                    after={<CalendarViewDayOutlinedIcon />}
                  >
                    PUBLISH
                  </AwesomeButton>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
