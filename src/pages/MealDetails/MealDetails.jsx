import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
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
import useUserRole from "../../api/useUserRole";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const MealDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const QueryClient = useQueryClient();
  const [userRole] = useUserRole();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [requestedMealInfo, setRequestedMealInfo] = useState("");

  const { data: mealDetails, isLoading } = useQuery({
    queryKey: ["mealDetails"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal/${id}`);
      return res.data;
    },
  });

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

  const { mutate: userRequestedMeal } = useMutation({
    mutationKey: ["userRequestedMeal"],
    mutationFn: async () => {
      return await axiosSecure.post("/requested-meal", requestedMealInfo);
    },
    onSuccess: () => {
      toast.success("Meal Requested Successfully!");
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const {
    _id,
    mealTitle,
    adminEmail,
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
    if (userRole.userBadge === "Bronze-Badge") {
      return Swal.fire({
        title: "Membership Required!",
        text: "You Need Membership For Meal Request",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Select Membership",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/membership");
        }
      });
    }
    const userRequestedMealData = {
      mealId: _id,
      userName: user?.displayName,
      userEmail: user?.email,
      status: "Pending",
    };
    setRequestedMealInfo(userRequestedMealData);
    userRequestedMeal();
  };

  return (
    <Stack sx={{ py: 10 }}>
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
                    {reviews?.length}
                  </Typography>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography variant="body1" fontWeight={500}>
                    Post Date:{" "}
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {dateTime.slice(0, 10)}
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
              <AwesomeButton
                onPress={handleRequestMeal}
                className="like-btn"
                type="primary"
              >
                <Typography variant="h6" fontWeight={700}>
                  Request Meal
                </Typography>
              </AwesomeButton>
              <AwesomeButton
                onPress={() => likeUpdate()}
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
      </Container>
    </Stack>
  );
};

export default MealDetails;
