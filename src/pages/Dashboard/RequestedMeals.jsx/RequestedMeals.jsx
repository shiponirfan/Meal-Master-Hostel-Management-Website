import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AwesomeButton } from "react-awesome-button";
import CloseIcon from "@mui/icons-material/Close";
import useRequestedMeals from "../../../api/useRequestedMeals";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

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

export default function RequestedMeals() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requestedMeal, requestedMealsLoading, requestedMealRefetch] =
    useRequestedMeals(user?.email);

  const { mutate: mealCancel } = useMutation({
    mutationKey: ["mealCancel", user?.email],
    mutationFn: async (id) => {
      return await axiosSecure.delete(
        `/auth/requested-meal/${id}?email=${user?.email}`
      );
    },
    onSuccess: () => {
      requestedMealRefetch();
      Swal.fire({
        title: "Canceled!",
        text: "Your file has been canceled.",
        icon: "success",
      });
    },
  });

  const handleMealCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Close",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mealCancel(id);
      }
    });
  };

  if (requestedMealsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 12 }}>
      <Table sx={{ minWidth: 700 }} aria-label="Requested Meals">
        <TableHead>
          <TableRow>
            <StyledTableCell>Meal Title</StyledTableCell>
            <StyledTableCell align="center">Likes Count</StyledTableCell>
            <StyledTableCell align="center">Reviews Count</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requestedMeal.map((meal) => (
            <StyledTableRow key={meal.requestedMealStatus.requestedMealId}>
              <StyledTableCell component="th" scope="row">
                <Link
                  style={{ textDecoration: "none", color: "#000000de" }}
                  to={`/meal/${meal._id}`}
                >
                  {meal.mealTitle}
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">{meal.likes}</StyledTableCell>
              <StyledTableCell align="center">
                {meal.reviews?.length}
              </StyledTableCell>
              <StyledTableCell align="center">
                {meal.requestedMealStatus.status}
              </StyledTableCell>
              <StyledTableCell align="center">
                <AwesomeButton
                  onPress={() =>
                    handleMealCancel(meal.requestedMealStatus.requestedMealId)
                  }
                  type="danger"
                >
                  <CloseIcon />
                  CANCEL
                </AwesomeButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
