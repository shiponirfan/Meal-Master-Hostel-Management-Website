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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import CalendarViewDayOutlinedIcon from "@mui/icons-material/CalendarViewDayOutlined";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useReviews from "../../../api/useReviews";
import { Rating, Star } from "@smastrom/react-rating";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#f77f00",
  inactiveFillColor: "#ffd1a1",
};
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
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

export default function MyReviews() {
  const { user, loading } = useAuth();

  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const [updatedReviewId, setUpdatedReviewId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewValue, setReviewValue] = useState("");
  const [pages, setPages] = useState(1);
  const [sortByRating, setSortByRating] = useState("");
  const [sortByLikes, setSortByLikes] = useState("");
  const allReviewsParams = {
    email: user?.email,
    sortByRating: sortByRating,
    sortByLikes: sortByLikes,
    pages: pages,
    limit: 8,
  };
  const [allReviews, reviewLoading, reviewRefetch] =
    useReviews(allReviewsParams);
  useEffect(() => {
    if (updatedReviewId) {
      setRating(updatedReviewId.reviewRating || 0);
      setReviewValue(updatedReviewId?.reviewDetails || "");
      setReviewId(updatedReviewId?._id || "");
    }
  }, [updatedReviewId]);
  const handleOpen = (reviews) => {
    setUpdatedReviewId(reviews);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
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

  useEffect(() => {
    reviewRefetch();
  }, [reviewRefetch, pages, sortByLikes, sortByRating]);

  const { mutate: updatedReview } = useMutation({
    mutationKey: ["updatedReview", user?.email],
    mutationFn: async (reviewDetails) => {
      return await axiosSecure.patch(
        `/updated-review/${reviewId}`,
        reviewDetails
      );
    },
    onSuccess: () => {
      setOpen(false);
      reviewRefetch();
      Swal.fire({
        title: "Success",
        text: "Review Update Successfully!",
        icon: "success",
      });
    },
  });

  if (loading || reviewLoading) {
    return <LoadingSpinner />;
  }

  const onSubmit = async (data) => {
    const reviewDetails = {
      reviewDetails: data.review ? data.review : reviewValue,
      reviewRating: rating,
    };
    updatedReview(reviewDetails);
  };

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
      <Helmet>
        <title>My Reviews - Dashboard</title>
      </Helmet>
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
          My Reviews
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
                <StyledTableCell align="center">Edit Review</StyledTableCell>
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
                    <AwesomeButton
                      onPress={() => handleOpen(reviews)}
                      type="secondary"
                      after={<CalendarViewDayOutlinedIcon />}
                    >
                      EDIT REVIEW
                    </AwesomeButton>
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
        {/* Update Review Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack>
              <Typography variant="h6" fontWeight={700}>
                Update Your Review:
              </Typography>
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl variant="filled" sx={{ width: "100%" }}>
                  <TextField
                    id="ReviewDetails"
                    label="Review Details"
                    variant="filled"
                    multiline
                    margin="normal"
                    value={reviewValue}
                    rows={8}
                    {...register("review")}
                    onChange={(event) => {
                      setReviewValue(event.target.value);
                    }}
                  />
                </FormControl>

                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography variant="h6" fontWeight={700}>
                    Rating:
                  </Typography>
                  <Rating
                    style={{ maxWidth: 250 }}
                    itemStyles={myStyles}
                    value={rating}
                    onChange={setRating}
                  />
                </Stack>

                <Stack direction={"row"} spacing={6} sx={{ mt: 1.6 }}>
                  <AwesomeButton style={{ width: "100%" }} type="primary">
                    Update Review
                  </AwesomeButton>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Modal>
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
