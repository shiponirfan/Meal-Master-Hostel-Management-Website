import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import banner1 from "../../../assets/banner/banner1.jpg";
import banner2 from "../../../assets/banner/banner2.jpg";
import banner3 from "../../../assets/banner/banner3.jpg";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useState } from "react";
import { useTheme } from "@emotion/react";

const BannerSlider = () => {
  const theme = useTheme();

  // TODO: Add Search Functions
  const [searchInput, setSearchInput] = useState();
  const handleSearch = () => {
    console.log(searchInput);
  };

  return (
    <Box>
      <Swiper
        style={{
          "--swiper-pagination-color": "#fff",
          "--swiper-pagination-bullet-inactive-color": "#999999",
          "--swiper-pagination-bullet-inactive-opacity": ".4",
          "--swiper-pagination-bullet-size": "16px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
        }}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper banner-slider"
      >
        <SwiperSlide>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              color: "white",
              height: "calc(100vh - 96px)",
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0.5)), url(${banner1})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <Container maxWidth={"xl"}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={8}
                  lg={6}
                  sx={{
                    [theme.breakpoints.up("xs")]: { textAlign: "center" },
                    [theme.breakpoints.up("md")]: { textAlign: "left" },
                  }}
                >
                  <Typography
                    variant="h2"
                    textTransform={"uppercase"}
                    fontWeight={"bold"}
                    sx={{
                      mt: 4,
                      [theme.breakpoints.up("lg")]: { fontSize: "3.65rem" },
                      [theme.breakpoints.up("md")]: { fontSize: "3rem" },
                      [theme.breakpoints.up("sm")]: { fontSize: "3rem" },
                      [theme.breakpoints.up("xs")]: { fontSize: "1.5rem" },
                    }}
                  >
                    Culinary Excellence Seamless Service
                  </Typography>
                  <Typography
                    sx={{
                      mb: 2.5,
                      mt: 0.5,
                      [theme.breakpoints.up("md")]: { fontSize: "1rem" },
                      [theme.breakpoints.up("sm")]: { fontSize: "1rem" },
                      [theme.breakpoints.up("xs")]: { fontSize: ".8rem" },
                    }}
                    variant="body1"
                  >
                    Discover a dining experience like never before. Our Hostel
                    Management site ensures top-notch culinary delights and
                    efficient service, making student life both savory and
                    stress-free.
                  </Typography>

                  <Stack
                    sx={{
                      [theme.breakpoints.up("xs")]: { alignItems: "center" },
                      [theme.breakpoints.up("md")]: { alignItems: "start" },
                    }}
                  >
                    <Paper
                      component="form"
                      sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        [theme.breakpoints.up("xs")]: { width: "300" },
                        [theme.breakpoints.up("md")]: { width: 400 },
                      }}
                    >
                      <SearchIcon sx={{ p: "10px" }} />
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Meals"
                        name="search_meals"
                        onChange={(e) => setSearchInput(e.target.value)}
                        inputProps={{ "aria-label": "search meals" }}
                      />
                      <Button onClick={handleSearch}>Search</Button>
                    </Paper>
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </Stack>
        </SwiperSlide>
        <SwiperSlide>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              color: "white",
              height: "calc(100vh - 96px)",
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0.5)), url(${banner2})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <Container maxWidth={"xl"}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={8}
                  lg={6}
                  sx={{
                    [theme.breakpoints.up("xs")]: { textAlign: "center" },
                    [theme.breakpoints.up("md")]: { textAlign: "left" },
                  }}
                >
                  <Typography
                    variant="h2"
                    textTransform={"uppercase"}
                    fontWeight={"bold"}
                    sx={{
                      mt: 4,
                      [theme.breakpoints.up("lg")]: { fontSize: "3.65rem" },
                      [theme.breakpoints.up("md")]: { fontSize: "3rem" },
                      [theme.breakpoints.up("sm")]: { fontSize: "3rem" },
                      [theme.breakpoints.up("xs")]: { fontSize: "1.5rem" },
                    }}
                  >
                    Effortless Dining Elevated Living
                  </Typography>
                  <Typography
                    sx={{
                      mb: 2.5,
                      mt: 0.5,
                      [theme.breakpoints.up("md")]: { fontSize: "1rem" },
                      [theme.breakpoints.up("sm")]: { fontSize: "1rem" },
                      [theme.breakpoints.up("xs")]: { fontSize: ".8rem" },
                    }}
                    variant="body1"
                  >
                    Experience the convenience of our Hostel Management system.
                    From personalized meal plans to streamlined service,
                    we&apos;re dedicated to enhancing your stay, one satisfying
                    meal at a time.
                  </Typography>

                  <Stack
                    sx={{
                      [theme.breakpoints.up("xs")]: { alignItems: "center" },
                      [theme.breakpoints.up("md")]: { alignItems: "start" },
                    }}
                  >
                    <Paper
                      component="form"
                      sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        [theme.breakpoints.up("xs")]: { width: "300" },
                        [theme.breakpoints.up("md")]: { width: 400 },
                      }}
                    >
                      <SearchIcon sx={{ p: "10px" }} />
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Meals"
                        name="search_meals"
                        onChange={(e) => setSearchInput(e.target.value)}
                        inputProps={{ "aria-label": "search meals" }}
                      />
                      <Button onClick={handleSearch}>Search</Button>
                    </Paper>
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </Stack>
        </SwiperSlide>
        <SwiperSlide>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              color: "white",
              height: "calc(100vh - 96px)",
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0.5)), url(${banner3})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <Container maxWidth={"xl"}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={8}
                  lg={6}
                  sx={{
                    [theme.breakpoints.up("xs")]: { textAlign: "center" },
                    [theme.breakpoints.up("md")]: { textAlign: "left" },
                  }}
                >
                  <Typography
                    variant="h2"
                    textTransform={"uppercase"}
                    fontWeight={"bold"}
                    sx={{
                      mt: 4,
                      [theme.breakpoints.up("lg")]: { fontSize: "3.65rem" },
                      [theme.breakpoints.up("md")]: { fontSize: "3rem" },
                      [theme.breakpoints.up("sm")]: { fontSize: "3rem" },
                      [theme.breakpoints.up("xs")]: { fontSize: "1.5rem" },
                    }}
                  >
                    Savor the Campus Experience
                  </Typography>
                  <Typography
                    sx={{
                      mb: 2.5,
                      mt: 0.5,
                      [theme.breakpoints.up("md")]: { fontSize: "1rem" },
                      [theme.breakpoints.up("sm")]: { fontSize: "1rem" },
                      [theme.breakpoints.up("xs")]: { fontSize: ".8rem" },
                    }}
                    variant="body1"
                  >
                    Indulge in a culinary journey tailored for students. Our
                    Hostel Management ensures delicious, nutritious meals,
                    making your university life a delightful adventure of
                    flavors and energy.
                  </Typography>

                  <Stack
                    sx={{
                      [theme.breakpoints.up("xs")]: { alignItems: "center" },
                      [theme.breakpoints.up("md")]: { alignItems: "start" },
                    }}
                  >
                    <Paper
                      component="form"
                      sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        [theme.breakpoints.up("xs")]: { width: "300" },
                        [theme.breakpoints.up("md")]: { width: 400 },
                      }}
                    >
                      <SearchIcon sx={{ p: "10px" }} />
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Meals"
                        name="search_meals"
                        onChange={(e) => setSearchInput(e.target.value)}
                        inputProps={{ "aria-label": "search meals" }}
                      />
                      <Button onClick={handleSearch}>Search</Button>
                    </Paper>
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </Stack>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default BannerSlider;
