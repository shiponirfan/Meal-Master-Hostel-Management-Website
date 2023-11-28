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
import { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import CalendarViewDayOutlinedIcon from "@mui/icons-material/CalendarViewDayOutlined";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
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
  const [pages, setPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const axiosSecure = useAxiosSecure();
  const allMealsParams = {
    mealType: "",
    mealTitle: searchQuery,
    sort: "",
    pages: pages,
    limit: 8,
  };
  const [meals, refetch, isLoading] = useMeals(allMealsParams);

  useEffect(() => {
    refetch();
  }, [refetch, pages, searchQuery]);

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

  const totalPages = meals?.totalPagesCount;
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
    refetch();
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
          All Users
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
            placeholder="Search Meals"
            name="search_meals"
            onBlur={(e) => setSearchQuery(e.target.value)}
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
              <StyledTableCell align="center">Likes</StyledTableCell>
              <StyledTableCell align="center">Reviews</StyledTableCell>
              <StyledTableCell align="center">Distributor Name</StyledTableCell>
              <StyledTableCell align="center">
                Distributor Email
              </StyledTableCell>
              <StyledTableCell align="center">Update</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
              <StyledTableCell align="center">View Meal</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meals?.result?.map((meal) => (
              <StyledTableRow key={meal._id}>
                <StyledTableCell component="th" scope="row">
                  {meal.mealTitle}
                </StyledTableCell>
                <StyledTableCell align="center">{meal.likes}</StyledTableCell>
                <StyledTableCell align="center">{meal.reviews}</StyledTableCell>
                <StyledTableCell align="center">
                  {meal.adminName}
                </StyledTableCell>
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
      <Divider sx={{ borderColor: "#f77f00" }} />
      <Stack
        sx={{ p: 1, bgcolor: "white", borderRadius: "0 0 20px 20px " }}
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
