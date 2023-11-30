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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useReviews from "../../../api/useReviews";

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

export default function AllReviews() {
  const { user, loading } = useAuth();

  const [pages, setPages] = useState(1);
  const [sortByRating, setSortByRating] = useState("");
  const [sortByLikes, setSortByLikes] = useState("");
  const allReviewsParams = {
    email: "",
    sortByRating: sortByRating,
    sortByLikes: sortByLikes,
    pages: pages,
    limit: 8,
  };

  const [allReviews, reviewLoading, reviewRefetch] =
    useReviews(allReviewsParams);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    reviewRefetch();
  }, [reviewRefetch, pages, sortByLikes, sortByRating]);

  const { mutate: reviewDelete } = useMutation({
    mutationKey: ["reviewDelete", user?.email],
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/auth/review-delete/${id}`);
    },
    onSuccess: () => {
      reviewRefetch();
      Swal.fire({
        title: "Deleted",
        text: "Review has been deleted.",
        icon: "success",
      });
    },
  });

  if (loading || reviewLoading) {
    return <LoadingSpinner />;
  }

  const handleReviewDelete = (id) => {
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
        reviewDelete(id);
      }
    });
  };

  const totalPages = allReviews?.totalPagesCount;
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
    setSortByRating(event.target.value);
  };
  const handleSortByLikes = (event) => {
    setSortByLikes(event.target.value);
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
        overflow={"auto"}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: "white", display: { xs: "none", md: "flex" } }}
        >
          All Reviews
        </Typography>
        <Stack direction={"row"} spacing={2}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ color: "white", display: { xs: "none", lg: "flex" } }}
            >
              Sort By Likes:
            </Typography>
            <FormControl
              variant="filled"
              sx={{
                minWidth: 200,
                bgcolor: "white",
                borderRadius: 2,
              }}
            >
              <InputLabel id="sortByLikes">Likes</InputLabel>
              <Select
                labelId="sortByLikes"
                id="sortByLikes"
                value={sortByLikes}
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
                onChange={handleSortByLikes}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={-1}>High To Low</MenuItem>
                <MenuItem value={1}>Low To High</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ color: "white", display: { xs: "none", lg: "flex" } }}
            >
              Sort By Rating:
            </Typography>
            <FormControl
              variant="filled"
              sx={{
                minWidth: 200,
                bgcolor: "white",
                borderRadius: 2,
              }}
            >
              <InputLabel id="sortByRating">Rating</InputLabel>
              <Select
                labelId="sortByRating"
                id="sortByRating"
                value={sortByRating}
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
      </Stack>
      <Stack>
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
                <StyledTableCell align="center">Review Rating</StyledTableCell>
                <StyledTableCell align="center">User Name</StyledTableCell>
                <StyledTableCell align="center">User Email</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
                <StyledTableCell align="center">View Meal</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allReviews?.result?.map((reviews) => (
                <StyledTableRow key={reviews._id}>
                  <StyledTableCell component="th" scope="row">
                    {reviews.mealTitle}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {reviews.reviewLikes} Likes
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {reviews.reviewRating} Star
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {reviews.reviewerName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {reviews.reviewerEmail}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <AwesomeButton
                      onPress={() => handleReviewDelete(reviews._id)}
                      type="danger"
                      after={<DeleteOutlineIcon />}
                    >
                      DELETE
                    </AwesomeButton>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Link to={`/meal/${reviews.mealId}`}>
                      <AwesomeButton
                        type="github"
                        after={<BrokenImageOutlinedIcon />}
                      >
                        View Meal
                      </AwesomeButton>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
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
