import {
  Box,
  Container,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import SearchIcon from "@mui/icons-material/Search";
import useUpcomingMeals from "../../api/useUpcomingMeals";
import UpcomingMealsCard from "../../components/Shared/UpcomingMealsCard/UpcomingMealsCard";
import FeaturedSection from "../../components/Home/FeaturedSection/FeaturedSection";
import NoDataFound from "../../components/Shared/NoDataFound";
const UpcomingMeals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [FilterByPrice, setFilterByPrice] = useState("");
  const [FilterByCategory, setFilterByCategory] = useState("");

  const upcomingParams = {
    mealType: FilterByCategory,
    mealTitle: searchQuery,
    sort: FilterByPrice,
    pages: "",
    limit: "",
  };

  const [upcomingMeals, refetch, isLoading] = useUpcomingMeals(upcomingParams);

  useEffect(() => {
    refetch();
  }, [FilterByCategory, FilterByPrice, refetch, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };
  const handleChange = (event) => {
    setFilterByPrice(event.target.value);
  };
  const handleSortByLikes = (event) => {
    setFilterByCategory(event.target.value);
  };
  return (
    <Box>
      <Stack sx={{ py: 10 }}>
        <Container maxWidth={"xl"}>
          <Stack sx={{ alignItems: "center" }}>
            {/* Meals Headers */}
            <Stack
              sx={{
                p: 2,
                bgcolor: "#e85d04",
                borderRadius: " 20px 20px 0 0",
                width: "100%",
              }}
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "white", display: { xs: "none", md: "flex" } }}
                  >
                    Filter By Category:
                  </Typography>
                  <FormControl
                    variant="filled"
                    sx={{
                      minWidth: 200,
                      bgcolor: "white",
                      borderRadius: 2,
                    }}
                  >
                    <InputLabel id="FilterByCategory">
                      Select Category
                    </InputLabel>
                    <Select
                      labelId="FilterByCategory"
                      id="FilterByCategory"
                      value={FilterByCategory}
                      variant="filled"
                      sx={{
                        bgcolor: "white",
                        borderRadius: 2,
                        "&:before": {
                          borderBottom: 0,
                        },
                        "&:hover": {
                          bgcolor: "white",
                          "&:before": {
                            borderBottom: 0,
                          },
                        },
                        "&:active": {
                          bgcolor: "white",
                        },
                        "&:focus": {
                          bgcolor: "white",
                        },
                      }}
                      onChange={handleSortByLikes}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                      <MenuItem value={"Lunch"}>Lunch</MenuItem>
                      <MenuItem value={"Dinner"}>Dinner</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "white", display: { xs: "none", md: "flex" } }}
                  >
                    Filter By Price:
                  </Typography>
                  <FormControl
                    variant="filled"
                    sx={{
                      minWidth: 200,
                      bgcolor: "white",
                      borderRadius: 2,
                    }}
                  >
                    <InputLabel id="FilterByPrice">Price Range</InputLabel>
                    <Select
                      labelId="FilterByPrice"
                      id="FilterByPrice"
                      value={FilterByPrice}
                      variant="filled"
                      sx={{
                        bgcolor: "white",
                        borderRadius: 2,
                        "&:before": {
                          borderBottom: 0,
                        },
                        "&:hover": {
                          bgcolor: "white",
                          "&:before": {
                            borderBottom: 0,
                          },
                        },
                        "&:active": {
                          bgcolor: "white",
                        },
                        "&:focus": {
                          bgcolor: "white",
                        },
                      }}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={-1}>High To Low</MenuItem>
                      <MenuItem value={1}>Low To High</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>
              <Paper
                component="form"
                onSubmit={handleSearch}
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SearchIcon />
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Meals"
                  name="search_meals"
                  onBlur={(e) => setSearchQuery(e.target.value)}
                  inputProps={{ "aria-label": "search meals" }}
                />
                <Button>Search</Button>
              </Paper>
            </Stack>

            {/* Meals Category Card */}
            {upcomingMeals?.result?.length > 0 ? (
              isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Grid container spacing={3} sx={{ mt: 6 }}>
                    {upcomingMeals?.result?.map((meal) => (
                      <Grid key={meal._id} item xs={12} md={4} lg={3}>
                        <UpcomingMealsCard meal={meal} />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )
            ) : isLoading ? <LoadingSpinner /> : (
              <Stack sx={{ pt: 8 }}><NoDataFound /></Stack>
            )}
          </Stack>
        </Container>
      </Stack>
      <FeaturedSection />
    </Box>
  );
};

export default UpcomingMeals;
