import PropTypes from "prop-types";
import { Box, FormControl, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { Rating, Star } from "@smastrom/react-rating";
import { AwesomeButton } from "react-awesome-button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useReviews from "../../api/useReviews";
import { useLocation, useNavigate } from "react-router-dom";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#f77f00",
  inactiveFillColor: "#ffd1a1",
};

const AddReviewInput = ({ reviewData }) => {
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const [, , reviewRefetch] = useReviews("");
  const location = useLocation();
  const navigate = useNavigate();
  const QueryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: mealReviewUpdate } = useMutation({
    mutationKey: ["mealReviewUpdate"],
    mutationFn: async () => {
      return await axiosSecure.post(
        `/meal/meal-review-update/${reviewData?._id}`
      );
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["reviews-by-meal"] });
    },
  });

  const { mutate: addReview } = useMutation({
    mutationKey: ["addReview", user?.email],
    mutationFn: async (reviewDetails) => {
      return await axiosSecure.post("/reviews", reviewDetails);
    },
    onSuccess: () => {
      mealReviewUpdate();
      reset();
      setRating(0);
      reviewRefetch();
      Swal.fire({
        title: "Success",
        text: "Review Added Successfully!",
        icon: "success",
      });
    },
  });
  const onSubmit = async (data) => {
    if (!user) {
      return Swal.fire({
        title: "You Need To Login First",
        text: "After Login You Can Add A Review",
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Close",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          return navigate("/login", { state: { from: location } });
        }
      });
    }

    const reviewDetails = {
      mealId: reviewData?._id,
      mealTitle: reviewData?.mealTitle,
      reviewDetails: data.review,
      reviewRating: rating,
      reviewLikes: 0,
      reviewPostedTime: new Date(),
      reviewerName: user?.displayName,
      reviewerEmail: user?.email,
      reviewerImage: user?.photoURL,
    };

    addReview(reviewDetails);
  };
  return (
    <Stack>
      <Typography variant="h6" fontWeight={700}>
        Add Your Review:
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl variant="filled" sx={{ width: "100%" }}>
          <TextField
            id="review"
            label="Review Details"
            multiline
            margin="normal"
            rows={4}
            variant="filled"
            {...register("review", { required: true })}
          />
          {errors.review && (
            <Typography
              variant="h6"
              component={"span"}
              sx={{ fontSize: "1rem" }}
              color={"secondary"}
            >
              Review Details is required
            </Typography>
          )}
        </FormControl>

        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Typography variant="h6" fontWeight={700}>
            Your Review Rating:
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
            Add Review
          </AwesomeButton>
        </Stack>
      </Box>
    </Stack>
  );
};

AddReviewInput.propTypes = {
  reviewData: PropTypes.object,
};

export default AddReviewInput;
