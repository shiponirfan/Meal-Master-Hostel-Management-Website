import PropTypes from "prop-types";
import { Divider, Grid, Rating, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useReviews from "../../api/useReviews";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddReviewInput from "./AddReviewInput";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Reviews = ({ reviewData }) => {
  const [allReviews, reviewLoading, reviewRefetch] = useReviews("");
  const axiosPublic = useAxiosPublic();

  const { mutate: reviewLikeUpdate } = useMutation({
    mutationKey: ["reviewLikeUpdate"],
    mutationFn: async (id) => {
      return await axiosPublic.post(`/review-like-update/${id}`);
    },
    onSuccess: () => {
      toast.success("Thank You For Like");
      reviewRefetch();
    },
  });

  const handleReviewLike = (id) => {
    reviewLikeUpdate(id);
  };

  if (reviewLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Stack sx={{ py: 8 }}>
      <Divider sx={{ mb: 8 }} />
      {/* Add Review Input */}
      <AddReviewInput reviewData={reviewData} />
      <Stack sx={{ py: 8 }}>
        <Typography sx={{ mb: 2 }} variant="h6" fontWeight={700}>
          All Reviews For {reviewData?.mealTitle}
        </Typography>
        <Grid container spacing={4}>
          {allReviews?.map((review) => (
            <Grid item key={review?._id} xs={12} md={6} lg={3}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: "#f77f00" }}
                      src={review?.reviewerImage}
                      aria-label="reviewer image"
                    ></Avatar>
                  }
                  action={
                    <Stack>
                      <IconButton
                        onClick={() => handleReviewLike(review?._id)}
                        aria-label="like"
                      >
                        <ThumbUpIcon />
                      </IconButton>
                      <Typography variant="body2">
                        {review?.reviewLikes} Liked
                      </Typography>
                    </Stack>
                  }
                  title={review?.reviewerName}
                  subheader={review?.reviewerEmail}
                />
                <CardContent>
                  <Stack
                    sx={{ mb: 1 }}
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    <Typography variant="body1" fontWeight={500}>
                      Review Rating:{" "}
                    </Typography>
                    <Rating
                      name="read-only"
                      value={review?.reviewRating}
                      readOnly
                    />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {review?.reviewDetails}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};
Reviews.propTypes = {
  reviewData: PropTypes.object,
};
export default Reviews;
