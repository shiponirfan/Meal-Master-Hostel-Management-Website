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
import { useEffect, useState } from "react";
import CalendarViewDayOutlinedIcon from "@mui/icons-material/CalendarViewDayOutlined";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useUpcomingMeals from "../../../api/useUpcomingMeals";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
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
  const [pages, setPages] = useState(1);
  const [sorts, setSorts] = useState("");
  const upcomingParams = {
    mealType: "",
    mealTitle: "",
    sort: sorts,
    pages: pages,
    limit: 8,
  };

  const [upcomingMeals, refetch, isLoading] = useUpcomingMeals(upcomingParams);

  useEffect(() => {
    refetch();
  }, [refetch, pages, sorts]);

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

  const totalPages = upcomingMeals?.totalPagesCount;
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

  const handleChange = (event) => {
    setSorts(event.target.value);
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
      <Helmet>
        <title>Upcoming Meals - Dashboard</title>
      </Helmet>
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
          All Upcoming Meals
        </Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={{ sm: 2, xs: 0 }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ color: "white", display: { xs: "none", md: "flex" } }}
          >
            Sort By Price Range:
          </Typography>
          <FormControl
            variant="filled"
            sx={{
              minWidth: 200,
              bgcolor: "white",
              borderRadius: 2,
            }}
          >
            <InputLabel id="SalaryRange">Price Range</InputLabel>
            <Select
              labelId="PriceRange"
              id="PriceRange"
              value={sorts}
              variant="filled"
              sx={{
                bgcolor: "white",
                borderRadius: 2,
                "&:before": {
                  borderBottom: 0,
                },
                "&:hover": {
                  bgcolor: "white",
                  "&:before": {
                    borderBottom: 0,
                  },
                },
                "&:active": {
                  bgcolor: "white",
                },
                "&:focus": {
                  bgcolor: "white",
                },
              }}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={-1}>High To Low</MenuItem>
              <MenuItem value={1}>Low To High</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <TableContainer
        component={Paper}
        sx={{ height: "calc(100vh - 230px)", borderRadius: 0 }}
      >
        <Table
          stickyHeader
          sx={{ minWidth: 1000 }}
          aria-label="Requested Meals"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Meal Title</StyledTableCell>
              <StyledTableCell align="center">Likes</StyledTableCell>
              <StyledTableCell align="center">Reviews</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Meal Type</StyledTableCell>
              <StyledTableCell align="center">Distributor Name</StyledTableCell>
              <StyledTableCell align="center">
                Distributor Email
              </StyledTableCell>
              <StyledTableCell align="center">Publish</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {upcomingMeals?.result?.map((meal) => (
              <StyledTableRow key={meal._id}>
                <StyledTableCell component="th" scope="row">
                  {meal.mealTitle}
                </StyledTableCell>
                <StyledTableCell align="center">{meal.likes}</StyledTableCell>
                <StyledTableCell align="center">{meal.reviews}</StyledTableCell>
                <StyledTableCell align="center">${meal.price}</StyledTableCell>
                <StyledTableCell align="center">
                  {meal.mealType}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {meal.adminName}
                </StyledTableCell>
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
