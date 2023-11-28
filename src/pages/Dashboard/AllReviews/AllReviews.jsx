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

import { Stack } from "@mui/material";

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
  const [allReviews, reviewLoading, reviewRefetch] = useReviews("");
  const axiosSecure = useAxiosSecure();

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

  return (
    <Stack>
      <TableContainer component={Paper} sx={{ mt: 12 }}>
        <Table sx={{ minWidth: 700 }} aria-label="Requested Meals">
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
            {allReviews?.map((reviews) => (
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
  );
}
