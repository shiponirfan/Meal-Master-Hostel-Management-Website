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
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

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
  const userEmail = user?.email;
  const [pages, setPages] = useState(1);

  const [requestedMeal, requestedMealsLoading, requestedMealRefetch] =
    useRequestedMeals(userEmail, pages, 8, "");

  useEffect(() => {
    requestedMealRefetch();
  }, [requestedMealRefetch, pages]);

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

  const totalPages = requestedMeal?.totalPages;
  const pageNumbersArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePagination = (btn) => {
    setPages(btn);
  };

  const handlePrevious = () => {
    if (pages > 1) {
      setPages(pages - 1);
    }
  };
  const handleNext = () => {
    if (pages < totalPages) {
      setPages(pages + 1);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{ p: 2, bgcolor: "#e85d04", borderRadius: " 20px 20px 0 0" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: "white", fontSize: {sm: '24px', xs: '18px'} }}
        >
          Requested Meals
        </Typography>
      </Stack>
      <TableContainer
        component={Paper}
        sx={{ height: "calc(100vh - 230px)", borderRadius: 0 }}
      >
        <Table stickyHeader sx={{ minWidth: 1000 }} aria-label="Requested Meals">
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
            {requestedMeal?.data?.map((meal) => (
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
                <StyledTableCell align="center">{meal.reviews}</StyledTableCell>
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
      <Divider sx={{ borderColor: "#f77f00" }} />
      <Stack
        sx={{ p: 1, bgcolor: "white", borderRadius: "0 0 20px 20px " }}
        justifyContent={"center"}
        alignItems={"center"}
        overflow={"auto"}
      >
        <ButtonGroup
          size="large"
          variant="outlined"
          aria-label="table pagination button"
        >
          <Button onClick={handlePrevious} variant="outlined">
            {"<"}
          </Button>
          {pageNumbersArray?.map((btn, index) => (
            <Button
              sx={{
                display: { xs: "none", sm: "flex" },
                bgcolor: btn === pages ? "#f77f00" : "",
                color: btn === pages ? "white" : "",
                "&:hover": {
                  bgcolor: btn === pages ? "#ff9900" : "",
                  color: btn === pages ? "white" : "",
                },
              }}
              variant="outlined"
              onClick={() => handlePagination(btn)}
              key={index}
            >
              {btn}
            </Button>
          ))}
          <Button onClick={handleNext} variant="outlined">
            {">"}
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
}
