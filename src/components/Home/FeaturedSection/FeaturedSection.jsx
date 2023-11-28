import { Container, Grid, Stack, Typography } from "@mui/material";
import featuredBg from "../../../assets/banner/featuredBg.jpg";
const FeaturedSection = () => {
  return (
    <Stack
      sx={{
        py: 18,
        background: `url(${featuredBg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        color: "white",
      }}
    >
      <Container maxWidth={"xl"}>
        <Grid container>
          <Grid item xs={12} md={5}>
            <Stack spacing={1} sx={{ color: "#232323" }}>
              <Typography variant="h2" fontWeight={700}>
                Healthier Choice For A Healthier You
              </Typography>
              <Typography>
                Nutrition Services is dedicated to bringing you and your family
                healthy, delicious food options whenever you&apos;re at one of
                our locations.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};

export default FeaturedSection;
