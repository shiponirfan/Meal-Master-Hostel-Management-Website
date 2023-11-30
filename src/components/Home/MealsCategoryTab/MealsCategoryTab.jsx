import { Container, Grid, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import MealsCategoryCard from "../../Shared/MealsCategoryCard/MealsCategoryCard";
import useMeals from "../../../api/useMeals";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./../../Shared/LoadingSpinner";
import HeadingTitle from "../../Shared/HeadingTitle";
import NoDataFound from "../../Shared/NoDataFound";
const MealsCategoryTab = () => {
  const [mealTypeTab, setMealTypeTab] = useState("");
  const allMealsParams = {
    mealType: mealTypeTab,
    mealTitle: "",
    sort: "",
    pages: "",
    limit: 12,
  };
  const [meals, refetch, isLoading] = useMeals(allMealsParams);
  useEffect(() => {
    refetch();
  }, [mealTypeTab, refetch]);
  return (
    <Stack sx={{ py: 10 }}>
      <Container maxWidth={"xl"}>
        <Stack sx={{ alignItems: "center" }}>
          {/* Heading Title */}
          <HeadingTitle
            titleOne={"Special"}
            titleSecond={"Dishes"}
            desc={
              "Crafted with exceptional flavors to enhance your dining journey"
            }
          />

          {/* Tab Button */}
          <ButtonGroup variant="outlined" aria-label="meals Category">
            <Button
              onClick={() => setMealTypeTab("")}
              sx={{
                textTransform: "none",
                fontSize: { sm: "18px", xs: "13px" },
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
                fontSize: { sm: "18px", xs: "13px" },
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
                fontSize: { sm: "18px", xs: "13px" },
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
                fontSize: { sm: "18px", xs: "13px" },
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
          {meals?.result?.length > 0 ? (
            isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <Grid container spacing={3} sx={{ mt: 6 }}>
                  {meals?.result?.map((meal) => (
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
            )
          ) : isLoading ? (
            <LoadingSpinner />
          ) : (
            <Stack sx={{ pt: 8 }}>
              <NoDataFound
                subHeading={
                  "Please check back later or try a different category."
                }
              />
            </Stack>
          )}
        </Stack>
      </Container>
    </Stack>
  );
};

export default MealsCategoryTab;
