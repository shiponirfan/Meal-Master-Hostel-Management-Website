import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AwesomeButton } from "react-awesome-button";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import useRequestedMeals from "../../../api/useRequestedMeals";

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

export default function ServeMeals() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requestedMeal, requestedMealsLoading, requestedMealRefetch] =
    useRequestedMeals("");

  const { mutate: mealServe } = useMutation({
    mutationKey: ["mealServe", user?.email],
    mutationFn: async (id) => {
      return await axiosSecure.post(`/meal-serve/${id}`);
    },
    onSuccess: () => {
      requestedMealRefetch();
      Swal.fire({
        title: "Delivered",
        text: "Meal Delivered Successfully",
        icon: "success",
      });
    },
  });

  const handleMealServe = (id) => {
    mealServe(id);
  };

  const handleMealDelivered = () => {
    Swal.fire("Meal Already Served");
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
            <StyledTableCell align="center">User Email</StyledTableCell>
            <StyledTableCell align="center">User Name</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Serve Button</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requestedMeal.map((meal) => (
            <StyledTableRow key={meal.requestedMealStatus.requestedMealId}>
              <StyledTableCell component="th" scope="row">
                {meal.mealTitle}
              </StyledTableCell>
              <StyledTableCell align="center">
                {meal.requestedMealStatus.userEmail}
              </StyledTableCell>
              <StyledTableCell align="center">
                {meal.requestedMealStatus.userName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {meal.requestedMealStatus.status}
              </StyledTableCell>
              <StyledTableCell align="center">
                {meal.requestedMealStatus.status === "Delivered" ? (
                  <AwesomeButton
                    onPress={() => handleMealDelivered()}
                    type="primary"
                    after={<DeliveryDiningIcon />}
                  >
                    SERVE
                  </AwesomeButton>
                ) : (
                  <AwesomeButton
                    onPress={() =>
                      handleMealServe(meal.requestedMealStatus.requestedMealId)
                    }
                    type="primary"
                    after={<DeliveryDiningIcon />}
                  >
                    SERVE
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
