import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Rating, Star } from "@smastrom/react-rating";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AwesomeButton } from "react-awesome-button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import useMealDetails from "../../../api/useMealDetails";
import { Helmet } from "react-helmet-async";
const image_hosting_key = import.meta.env.VITE_IMGBB_ACCESS_TOKEN;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const myStyles = {
  itemShapes: Star,
  activeFillColor: "#f77f00",
  inactiveFillColor: "#c0b8ff",
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const UpdateMeal = () => {
  const { id } = useParams();
  const [mealDetails, isLoading] = useMealDetails(id);
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [mealTypes, setMealTypes] = useState("");
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [rating, setRating] = useState(0);
  const [mealIngredientsData, setMealIngredientsData] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: UpdateMealData } = useMutation({
    mutationKey: ["UpdateMealData", user?.email],
    mutationFn: async (mealData) => {
      return await axiosSecure.patch(`/update-meal/${id}`, mealData);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Meal Update Successfully!",
        icon: "success",
      });
    },
  });

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  const ingredients = [
    "Eggs",
    "Cheese",
    "Garlic",
    "Onions",
    "Oregano",
    "Spinach",
    "Tomatoes",
    "Spaghetti",
    "Ground beef",
    "Tomato sauce",
    "Bell peppers",
  ];

  const onSubmit = async (data) => {
    let mealUpdatedImg = "";
    const imageFile = { image: data.mealImage[0] };

    if (imageFile.image) {
      const imageRes = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      mealUpdatedImg = imageRes.data.data.display_url;
    }

    const mealData = {
      mealTitle: data.MealTitle,
      mealType: data.MealType,
      mealImage: mealUpdatedImg ? mealUpdatedImg : mealDetails?.mealImage,
      ingredients: mealIngredientsData
        ? mealIngredientsData
        : mealDetails?.ingredients,
      description: data.Description,
      price: parseInt(data.Price),
      rating: rating ? rating : mealDetails?.rating,
      dateTime: new Date(),
      likes: parseInt(data.Likes),
      reviews: parseInt(data.Reviews),
      adminName: data.DistributorName,
      adminEmail: data.DistributorEmail,
    };

    UpdateMealData(mealData);
  };
  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 64px)",
        justifyContent: "center",
      }}
    >
      <Helmet>
        <title>Update Meal - Dashboard</title>
      </Helmet>
      <Stack
        sx={{
          bgcolor: "white",
          p: { xs: 2, sm: 3, md: 6 },
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Update Meal
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Grid container columnSpacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl variant="filled" sx={{ width: "100%" }}>
                <TextField
                  variant="filled"
                  margin="normal"
                  fullWidth
                  id="MealTitle"
                  label="Meal Title"
                  name="MealTitle"
                  defaultValue={mealDetails?.mealTitle}
                  autoFocus
                  {...register("MealTitle", { required: true })}
                />
                {errors.MealTitle && (
                  <Typography
                    variant="h6"
                    component={"span"}
                    sx={{ fontSize: "1rem" }}
                    color={"secondary"}
                  >
                    Meal Title is required
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl
                margin="normal"
                variant="filled"
                sx={{ width: "100%" }}
              >
                <InputLabel id="MealType">Meal Type</InputLabel>
                <Select
                  labelId="MealType"
                  id="MealType"
                  value={!mealTypes ? mealDetails?.mealType : mealTypes}
                  {...register("MealType", { required: true })}
                  onChange={(e) => setMealTypes(e.target.value)}
                >
                  <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                  <MenuItem value={"Lunch"}>Lunch</MenuItem>
                  <MenuItem value={"Dinner"}>Dinner</MenuItem>
                </Select>
                {errors.MealType && (
                  <Typography
                    variant="h6"
                    component={"span"}
                    sx={{ fontSize: "1rem" }}
                    color={"secondary"}
                  >
                    Meal Type is required
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl variant="filled" sx={{ width: "100%" }}>
                <TextField
                  variant="filled"
                  margin="normal"
                  fullWidth
                  id="Price"
                  label="Price"
                  name="Price"
                  type="number"
                  defaultValue={mealDetails?.price}
                  autoFocus
                  {...register("Price", { required: true })}
                />
                {errors.Price && (
                  <Typography
                    variant="h6"
                    component={"span"}
                    sx={{ fontSize: "1rem" }}
                    color={"secondary"}
                  >
                    Price is required
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={2}>
              <FormControl variant="filled" sx={{ width: "100%" }}>
                <TextField
                  variant="filled"
                  margin="normal"
                  fullWidth
                  id="Likes"
                  label="Likes"
                  name="Likes"
                  type="number"
                  autoFocus
                  defaultValue={mealDetails?.likes}
                  {...register("Likes")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <FormControl variant="filled" sx={{ width: "100%" }}>
                <TextField
                  variant="filled"
                  margin="normal"
                  fullWidth
                  id="Reviews"
                  label="Reviews"
                  name="Reviews"
                  type="number"
                  autoFocus
                  defaultValue={mealDetails?.reviews}
                  {...register("Reviews")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={2}>
              <FormControl variant="filled" sx={{ width: "100%" }}>
                <TextField
                  variant="filled"
                  margin="normal"
                  fullWidth
                  id="DistributorName"
                  label="Distributor Name"
                  name="DistributorName"
                  autoFocus
                  defaultValue={mealDetails?.adminName}
                  {...register("DistributorName")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={2}>
              <FormControl variant="filled" sx={{ width: "100%" }}>
                <TextField
                  variant="filled"
                  margin="normal"
                  fullWidth
                  id="DistributorEmail"
                  label="Distributor Email"
                  name="DistributorEmail"
                  autoFocus
                  defaultValue={mealDetails?.adminEmail}
                  {...register("DistributorEmail")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl variant="filled" sx={{ width: "100%" }}>
                <Autocomplete
                  onChange={(event, value) => setMealIngredientsData(value)}
                  multiple
                  variant="filled"
                  id="ingredients"
                  options={ingredients}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  defaultValue={
                    !mealIngredientsData
                      ? mealDetails?.ingredients
                      : mealIngredientsData
                  }
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      label="Ingredients"
                      placeholder="Ingredients"
                      margin="normal"
                      name="Ingredients"
                      {...register("Ingredients")}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl variant="filled" sx={{ width: "100%" }}>
                <TextField
                  id="Description"
                  label="Description"
                  multiline
                  margin="normal"
                  rows={4}
                  variant="filled"
                  defaultValue={mealDetails?.description}
                  {...register("Description", { required: true })}
                />
                {errors.Description && (
                  <Typography
                    variant="h6"
                    component={"span"}
                    sx={{ fontSize: "1rem" }}
                    color={"secondary"}
                  >
                    Description Title is required
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={"center"}
              >
                <Button
                  sx={{ mt: 0.5, textTransform: "none" }}
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Profile Image
                  <VisuallyHiddenInput {...register("mealImage")} type="file" />
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{ mt: { xs: 1.5, sm: 0 } }}
                alignItems={"center"}
              >
                <Typography variant="h6" fontWeight={700}>
                  Add Rating:
                </Typography>
                <Rating
                  style={{ maxWidth: 250 }}
                  itemStyles={myStyles}
                  value={rating ? rating : mealDetails?.rating}
                  onChange={setRating}
                />
              </Stack>
            </Grid>
          </Grid>

          <Stack direction={"row"} spacing={6} sx={{ mt: 1.6 }}>
            <AwesomeButton style={{ width: "100%" }} type="primary">
              Update Meal
            </AwesomeButton>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default UpdateMeal;
