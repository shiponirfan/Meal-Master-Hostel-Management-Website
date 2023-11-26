import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Rating, Star } from "@smastrom/react-rating";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
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
import toast from "react-hot-toast";
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
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [mealType, setMealType] = useState("");
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [rating, setRating] = useState(0);
  const [mealIngredientsData, setMealIngredientsData] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: addMeal } = useMutation({
    mutationKey: ["addMeal", user?.email],
    mutationFn: async (mealData) => {
      return await axiosSecure.post("/meal", mealData);
    },
    onSuccess: () => {
      toast.success("Meal Added Successfully!");
    },
  });
  const [submitTypes, setSubmitTypes] = useState("");
  if (loading) {
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

    const imageFile = { image: data.mealImage[0] };
    const imageRes = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (imageRes.data.success) {
      const mealData = {
        mealTitle: data.MealTitle,
        mealType: data.MealType,
        mealImage: imageRes.data.data.display_url,
        ingredients: mealIngredientsData,
        description: data.Description,
        price: parseInt(data.Price),
        rating: rating,
        dateTime: new Date(),
        likes: parseInt(data.Likes),
        reviews: [],
        adminName: data.DistributorName,
        adminEmail: data.DistributorEmail,
      };

      if (submitTypes === "addMeal") {
        addMeal(mealData);
      }

      if (submitTypes === "upcoming") {
        // addMeal(mealData);
      }

    }
  };

  return (
    <Stack>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <FormControl variant="filled" sx={{ width: "100%" }}>
          <TextField
            variant="filled"
            margin="normal"
            fullWidth
            id="MealTitle"
            label="Meal Title"
            name="MealTitle"
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

        <FormControl margin="normal" variant="filled" sx={{ width: "100%" }}>
          <InputLabel id="MealType">Meal Type</InputLabel>
          <Select
            labelId="MealType"
            id="MealType"
            value={mealType}
            {...register("MealType", { required: true })}
            onChange={(e) => setMealType(e.target.value)}
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

        <FormControl variant="filled" sx={{ width: "100%" }}>
          <Autocomplete
            onChange={(event, value) => setMealIngredientsData(value)}
            multiple
            variant="filled"
            id="ingredients"
            options={ingredients}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
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
          {errors.Ingredients && (
            <Typography
              variant="h6"
              component={"span"}
              sx={{ fontSize: "1rem" }}
              color={"secondary"}
            >
              Ingredients is required
            </Typography>
          )}
        </FormControl>

        <FormControl variant="filled" sx={{ width: "100%" }}>
          <TextField
            variant="filled"
            margin="normal"
            fullWidth
            id="Price"
            label="Price"
            name="Price"
            type="number"
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
            defaultValue={0}
            {...register("Likes")}
          />
        </FormControl>

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
            defaultValue={0}
            {...register("Reviews")}
          />
        </FormControl>

        <FormControl variant="filled" sx={{ width: "100%" }}>
          <TextField
            variant="filled"
            margin="normal"
            fullWidth
            id="DistributorName"
            label="Distributor Name"
            name="DistributorName"
            autoFocus
            defaultValue={user?.displayName}
            {...register("DistributorName")}
          />
        </FormControl>

        <FormControl variant="filled" sx={{ width: "100%" }}>
          <TextField
            variant="filled"
            margin="normal"
            fullWidth
            id="DistributorEmail"
            label="Distributor Email"
            name="DistributorEmail"
            autoFocus
            defaultValue={user?.email}
            {...register("DistributorEmail")}
          />
        </FormControl>

        <FormControl variant="filled" sx={{ width: "100%" }}>
          <TextField
            id="Description"
            label="Description"
            multiline
            margin="normal"
            rows={4}
            variant="filled"
            {...register("Description")}
          />
          {errors.Description && (
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

        <Stack direction={"row"} spacing={6} sx={{ mt: 1.6 }}>
          <AwesomeButton
            onPress={() => {
              setSubmitTypes("addMeal");
            }}
            style={{ width: "100%" }}
            type="primary"
          >
            Add Meal
          </AwesomeButton>
          <AwesomeButton
            onPress={() => {
              setSubmitTypes("upcoming");
            }}
            style={{ width: "100%" }}
            type="secondary"
          >
            Add To Upcoming Meal
          </AwesomeButton>
        </Stack>
      </Box>
    </Stack>
  );
};

export default UpdateMeal;
