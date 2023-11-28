import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./../../components/Shared/LoadingSpinner";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { AwesomeButton } from "react-awesome-button";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useMealDetails from "../../api/useMealDetails";
import Reviews from "../../components/Reviews/Reviews";
import BreadcrumbsSection from "../../components/Shared/Breadcrumbs/BreadcrumbsSection";
import FeaturedSection from "../../components/Home/FeaturedSection/FeaturedSection";
import RequestMealButton from "./RequestMealButton";

const MealDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [mealDetails, isLoading] = useMealDetails(id);
  const { mutate: likeUpdate } = useMutation({
    mutationKey: ["likeUpdate"],
    mutationFn: async () => {
      return await axiosSecure.post(`/meal/like-update/${id}`);
    },
    onSuccess: () => {
      toast.success("Thank You For Like");
      QueryClient.invalidateQueries({ queryKey: ["mealDetails"] });
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const {
    _id,
    mealTitle,
    adminName,
    dateTime,
    description,
    ingredients,
    likes,
    mealImage,
    mealType,
    price,
    reviews,
    rating: mealRating,
  } = mealDetails;

  const handleRequestMeal = () => {
    if (!user) {
      return Swal.fire({
        title: "You Need To Login First",
        text: "After Login You Can Request Meal",
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
  };

  const handleLike = () => {
    if (!user) {
      return Swal.fire({
        title: "You Need To Login First",
        text: "After Login You Can Like Meal",
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
    likeUpdate();
  };

  return (
    <Box>
      <BreadcrumbsSection mealTitle={mealTitle} mealImage={mealImage} />
      <Stack sx={{ pt: 10 }}>
        <Container maxWidth={"xl"}>
          <Grid container maxWidth={"xl"} spacing={8}>
            <Grid item xs={12} lg={6}>
              <Box component={"div"} sx={{ height: "500px" }}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                  src={mealImage}
                  alt={mealTitle}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Stack spacing={1}>
                <Typography variant="h4" fontWeight={700}>
                  {mealTitle}
                </Typography>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography variant="h6" fontWeight={500}>
                    Meal Distributor:{" "}
                  </Typography>
                  <Typography color={"primary"} variant="h6" fontWeight={700}>
                    {adminName}
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Typography variant="h6" fontWeight={500}>
                      Price:{" "}
                    </Typography>
                    <Typography color={"primary"} variant="h6" fontWeight={700}>
                      ${price}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Typography variant="h6" fontWeight={500}>
                      Meal Type:{" "}
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      {mealType}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Typography variant="body1" fontWeight={500}>
                      Rating:{" "}
                    </Typography>
                    <Rating name="read-only" value={mealRating} readOnly />
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Typography variant="body1" fontWeight={500}>
                      Like:{" "}
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {likes}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Typography variant="body1" fontWeight={500}>
                      Reviews:{" "}
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {reviews}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Typography variant="body1" fontWeight={500}>
                      Post Date:{" "}
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {dateTime?.slice(0, 10)}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Divider sx={{ my: 2 }} />

              <Stack spacing={1} sx={{ my: 2 }}>
                <Typography variant="h6" fontWeight={700}>
                  Ingredients
                </Typography>
                <Stack direction="row" spacing={1}>
                  {ingredients?.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      variant="outlined"
                      color="primary"
                      sx={{ fontSize: "16px" }}
                    />
                  ))}
                </Stack>
              </Stack>

              <Stack spacing={1} sx={{ my: 2 }}>
                <Typography variant="h6" fontWeight={700}>
                  Description
                </Typography>
                <Typography variant="body1">{description}</Typography>
              </Stack>

              <Stack direction={"row"} spacing={2}>
                {user ? (
                  <RequestMealButton mealId={_id} />
                ) : (
                  <AwesomeButton
                    onPress={handleRequestMeal}
                    className="like-btn"
                    type="primary"
                  >
                    <Typography variant="h6" fontWeight={700}>
                      Request Meal
                    </Typography>
                  </AwesomeButton>
                )}
                <AwesomeButton
                  onPress={handleLike}
                  className="like-btn"
                  type="secondary"
                >
                  <FavoriteIcon />
                  <Typography variant="h6" fontWeight={700}>
                    Like {likes}
                  </Typography>
                </AwesomeButton>
              </Stack>
            </Grid>
          </Grid>
          <Reviews reviewData={mealDetails} />
        </Container>
      </Stack>
      <FeaturedSection />
    </Box>
  );
};

export default MealDetails;
