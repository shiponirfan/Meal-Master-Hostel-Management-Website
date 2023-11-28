import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Rating, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AwesomeButton } from "react-awesome-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
export default function UpcomingMealsCard({ meal }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const QueryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const { _id, mealTitle, mealImage, price, rating, likes } = meal;

  const { mutate: upcomingLikeUpdate } = useMutation({
    mutationKey: ["upcomingLikeUpdate"],
    mutationFn: async () => {
      return await axiosSecure.post(`/meal/upcoming-like-update/${_id}`);
    },
    onSuccess: (data) => {
      if (data.data.message === "Already Liked") {
        toast.error("You have already liked this meal.");
      } else {
        toast.success("Thank You For Like");
        QueryClient.invalidateQueries({ queryKey: ["upcomingMeals"] });
      }
    },
  });

  const handleLikeUpdate = () => {
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

    upcomingLikeUpdate();
  };

  return (
    <Card>
      <CardMedia sx={{ height: 200 }} image={mealImage} title={mealTitle} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" fontWeight={600}>
          {mealTitle}
        </Typography>

        <Stack direction={"row"} alignItems={"center"} spacing={0.8}>
          <Typography variant="h6" component="h3" fontWeight={600}>
            Price:
          </Typography>
          <Typography variant="h6" component="span">
            ${price}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={0.8}
          sx={{
            mb: 1.5,
          }}
        >
          <Typography variant="h6" component="h3" fontWeight={600}>
            Rating:
          </Typography>
          <Rating name="read-only" value={rating} readOnly />
        </Stack>
        <AwesomeButton
          style={{ width: "100%" }}
          onPress={() => handleLikeUpdate()}
          className="like-btn"
          type="secondary"
        >
          <FavoriteIcon />
          <Typography variant="h6" fontWeight={700}>
            Like {likes}
          </Typography>
        </AwesomeButton>
      </CardContent>
    </Card>
  );
}

UpcomingMealsCard.propTypes = {
  meal: PropTypes.object,
};
