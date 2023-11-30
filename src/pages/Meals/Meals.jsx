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
import MealsCategoryCard from "../../components/Shared/MealsCategoryCard/MealsCategoryCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import SearchIcon from "@mui/icons-material/Search";
import FeaturedSection from "../../components/Home/FeaturedSection/FeaturedSection";
import NoDataFound from "../../components/Shared/NoDataFound";
import featuredImg from "../../assets/banner/breadcumbimg.jpg";
import BreadcrumbsSection from "../../components/Shared/Breadcrumbs/BreadcrumbsSection";
import useAuth from "../../hooks/useAuth";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const Meals = () => {
  const { homeSearchInput } = useAuth();
  const [searchQuery, setSearchQuery] = useState(homeSearchInput);
  const [FilterByPrice, setFilterByPrice] = useState("");
  const [FilterByCategory, setFilterByCategory] = useState("");

  const axiosPublic = useAxiosPublic();

  const getMeals = async ({ pageParam = 1 }) => {
    const res = await axiosPublic.get("/meals", {
      params: {
        mealType: FilterByCategory,
        mealTitle: searchQuery,
        sort: FilterByPrice,
        pages: pageParam,
        limit: 12,
      },
    });
    return { ...res.data, prevOffset: pageParam };
  };

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["infinityMeals"],
    queryFn: getMeals,
    getNextPageParam: (LastPage) => {
      if (LastPage.prevOffset + 10 > LastPage.totalPagesCount) {
        return false;
      }
      return LastPage.prevOffset + 10;
    },
  });

  const mealsQuery = data?.pages.reduce((meal, page) => {
    return [...meal, ...page.result];
  }, []);

  useEffect(() => {
    refetch();
  }, [FilterByCategory, FilterByPrice, refetch, searchQuery, homeSearchInput]);

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
      <BreadcrumbsSection
        mealTitle={"All Meals"}
        breadcrumbs={"All Meals"}
        mealImage={featuredImg}
      />
      <Stack sx={{ py: 8 }}>
        <Container maxWidth={"xl"}>
          <Stack sx={{ alignItems: "center" }}>
            {/* Meals Headers */}
            <Stack
              sx={{
                p: 2,
                bgcolor: "#e85d04",
                borderRadius: " 20px 20px 0 0",
                width: "100%",
                flexDirection: { xs: "column", md: "row" },
              }}
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={{ xs: 1, sm: 2, md: 0 }}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={{ xs: 0.5, sm: 2 }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={{ xs: 0.5, sm: 2 }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "white", display: { xs: "none", lg: "flex" } }}
                  >
                    Filter By Category:
                  </Typography>
                  <FormControl
                    variant="filled"
                    sx={{
                      minWidth: { xs: 140, sm: 200 },
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
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={{ xs: 0.5, sm: 2 }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "white", display: { xs: "none", lg: "flex" } }}
                  >
                    Filter By Price:
                  </Typography>
                  <FormControl
                    variant="filled"
                    sx={{
                      minWidth: { xs: 140, sm: 200 },
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
                className="bigMealSearch"
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
                  defaultValue={searchQuery}
                  onBlur={(e) => setSearchQuery(e.target.value)}
                  inputProps={{ "aria-label": "search meals" }}
                />
                <Button>Search</Button>
              </Paper>
            </Stack>
            {mealsQuery && mealsQuery.length > 0 ? (
              <InfiniteScroll
                dataLength={(mealsQuery && mealsQuery.length) || 0}
                next={() => fetchNextPage()}
                hasMore={hasNextPage}
                loader={<LoadingSpinner />}
                scrollThreshold={0.5}
              >
                <Grid container spacing={3} sx={{ mt: 6 }}>
                  {mealsQuery?.map((meal, index) => (
                    <Grid key={index} item xs={12} md={4} lg={3}>
                      <MealsCategoryCard meal={meal} />
                    </Grid>
                  ))}
                </Grid>
              </InfiniteScroll>
            ) : mealsQuery ? (
              <Stack sx={{ pt: 8 }}>
                <NoDataFound />
              </Stack>
            ) : (
              <LoadingSpinner />
            )}
          </Stack>
        </Container>
      </Stack>
      <FeaturedSection />
    </Box>
  );
};

export default Meals;
