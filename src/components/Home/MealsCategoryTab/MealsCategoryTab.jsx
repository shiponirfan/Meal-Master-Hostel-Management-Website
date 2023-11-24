import { Container, Grid, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import MealsCategoryCard from "../../Shared/MealsCategoryCard/MealsCategoryCard";
import useMeals from "../../../api/useMeals";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
const MealsCategoryTab = () => {
  const [mealTypeTab, setMealTypeTab] = useState("");
  const mealType = mealTypeTab;
  const [meals, refetch, isLoading] = useMeals({ mealType });
  useEffect(() => {
    refetch();
  }, [mealTypeTab, refetch]);
  return (
    <Stack sx={{ py: 10 }}>
      <Container maxWidth={"xl"}>
        <Stack sx={{ alignItems: "center" }}>
          {/* Heading Title */}
          <Stack sx={{ mb: 5, alignItems: "center" }}>
            <Typography
              className="norican"
              variant="h1"
              fontWeight={700}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1.5rem",
                mb: 1,
              }}
            >
              Special{" "}
              <Typography
                className="norican"
                variant="h1"
                component="span"
                fontWeight={700}
                color={"primary"}
              >
                Dishes
              </Typography>
            </Typography>
            <Typography variant="body1">
              Crafted with exceptional flavors to enhance your dining journey
            </Typography>
          </Stack>

          {/* Tab Button */}
          <ButtonGroup variant="outlined" aria-label="meals Category">
            <Button
              onClick={() => setMealTypeTab("")}
              sx={{
                textTransform: "none",
                fontSize: 18,
                fontWeight: "700",
                backgroundColor: mealTypeTab === "" ? "#f77f00" : "",
                color: mealTypeTab === "" ? "#fff" : "",
                "&:hover": {
                  backgroundColor: mealTypeTab === "" ? "#f77f00" : "",
                },
              }}
            >
              All Meals
            </Button>
            <Button
              onClick={() => setMealTypeTab("Breakfast")}
              sx={{
                textTransform: "none",
                fontSize: 18,
                fontWeight: "700",
                backgroundColor: mealTypeTab === "Breakfast" ? "#f77f00" : "",
                color: mealTypeTab === "Breakfast" ? "#fff" : "",
                "&:hover": {
                  backgroundColor: mealTypeTab === "Breakfast" ? "#f77f00" : "",
                },
              }}
            >
              Breakfast
            </Button>
            <Button
              onClick={() => setMealTypeTab("Lunch")}
              sx={{
                textTransform: "none",
                fontSize: 18,
                fontWeight: "700",
                backgroundColor: mealTypeTab === "Lunch" ? "#f77f00" : "",
                color: mealTypeTab === "Lunch" ? "#fff" : "",
                "&:hover": {
                  backgroundColor: mealTypeTab === "Lunch" ? "#f77f00" : "",
                },
              }}
            >
              Lunch
            </Button>
            <Button
              onClick={() => setMealTypeTab("Dinner")}
              sx={{
                textTransform: "none",
                fontSize: 18,
                fontWeight: "700",
                backgroundColor: mealTypeTab === "Dinner" ? "#f77f00" : "",
                color: mealTypeTab === "Dinner" ? "#fff" : "",
                "&:hover": {
                  backgroundColor: mealTypeTab === "Dinner" ? "#f77f00" : "",
                },
              }}
            >
              Dinner
            </Button>
          </ButtonGroup>

          {/* Meals Category Card */}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Grid container sx={{ mt: 6 }}>
                {meals?.map((meal) => (
                  <Grid key={meal._id} item xs={12} md={4} lg={3}>
                    <MealsCategoryCard meal={meal} />
                  </Grid>
                ))}
              </Grid>
              <Link to="/meals">
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontSize: 18,
                    fontWeight: "700",
                    color: "white",
                    py: 1,
                    mt: 6,
                  }}
                >
                  See All Meals
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </Container>
    </Stack>
  );
};

export default MealsCategoryTab;