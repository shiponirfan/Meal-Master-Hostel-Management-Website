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
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

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
  const [searchInput, setSearchInput] = useState("");
  const [pages, setPages] = useState(1);
  const [requestedMeal, requestedMealsLoading, requestedMealRefetch] =
    useRequestedMeals("", pages, 8, searchInput);

  useEffect(() => {
    requestedMealRefetch();
  }, [requestedMealRefetch, pages, searchInput]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    requestedMealRefetch();
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
          sx={{ color: "white", display: { xs: "none", sm: "flex" } }}
        >
          All Serve Meals
        </Typography>
        <Paper
          component="form"
          onSubmit={handleSearch}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchIcon />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Username, Email"
            name="search_meals"
            onBlur={(e) => setSearchInput(e.target.value)}
            inputProps={{ "aria-label": "search meals" }}
          />
          <Button>Search</Button>
        </Paper>
      </Stack>

      <TableContainer
        component={Paper}
        sx={{ height: "calc(100vh - 230px)", borderRadius: 0 }}
      >
        <Table stickyHeader sx={{ minWidth: 700 }} aria-label="Requested Meals">
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
            {requestedMeal?.data?.map((meal) => (
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
                        handleMealServe(
                          meal.requestedMealStatus.requestedMealId
                        )
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
      <Divider sx={{ borderColor: "#f77f00" }} />
      <Stack
        sx={{ p: 2, bgcolor: "white", borderRadius: "0 0 20px 20px " }}
        justifyContent={"center"}
        alignItems={"center"}
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
                bgcolor: btn === pages ? "#f77f00" : "",
                color: btn === pages ? "white" : "",
                '&:hover': {
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
