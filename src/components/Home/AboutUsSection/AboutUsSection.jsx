import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import aboutusbg from "../../../assets/icons/aboutus.png";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
const AboutUsSection = () => {
  return (
    <Stack
      sx={{
        py: 8,
      }}
    >
      <Container maxWidth={"xl"}>
        <Grid container>
          <Grid item xs={12} md={6} >
            <Box sx={{ height: "600px" }}>
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src={aboutusbg}
                alt="about us"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1} sx={{ color: "#232323", height: '100%' }} justifyContent={'center'} >
              <Typography variant="h4" fontWeight={700}>
                About Meal Master
              </Typography>
              <Stack spacing={5}>
                <Stack direction={"row"} alignItems={"start"} spacing={2}>
                  <RateReviewIcon
                    sx={{ pt: 1, fontSize: "50px", color: "#f77f00" }}
                  />
                  <Stack>
                    <Typography variant="h6" fontWeight={700}>
                      Tailored Meal Recommendations
                    </Typography>
                    <Typography>
                      Utilizing advanced algorithms, Meal Master personalizes
                      meal suggestions based on your preferences, dietary
                      requirements, and past orders. This ensures a customized
                      dining experience, helping you discover delectable meals
                      effortlessly.
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction={"row"} alignItems={"start"} spacing={2}>
                  <FastfoodIcon
                    sx={{ pt: 1, fontSize: "50px", color: "#f77f00" }}
                  />
                  <Stack>
                    <Typography variant="h6" fontWeight={700}>
                      Effortless Meal Ordering
                    </Typography>
                    <Typography>
                      Experience a simplified meal ordering process with Meal
                      Master. Our platform streamlines the ordering journey,
                      allowing you to place your favorite meal orders with just
                      a few clicks. Enjoy the convenience, save time, and savor
                      your culinary choices.
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction={"row"} alignItems={"start"} spacing={2}>
                  <PeopleAltIcon
                    sx={{ pt: 1, fontSize: "50px", color: "#f77f00" }}
                  />
                  <Stack>
                    <Typography variant="h6" fontWeight={700}>
                      Community Feedback
                    </Typography>
                    <Typography>
                      Explore feedback from fellow users to make well-informed
                      decisions about your meal selections. Meal Master
                      encourages a community-driven approach, providing insights
                      and recommendations from those who have enjoyed similar
                      dining experiences.
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};

export default AboutUsSection;
