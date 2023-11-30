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
        zIndex: 1,
        position: "relative",
        "::before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "black",
          opacity: { xs: 0.6, sm: 0 },
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth={"xl"}>
        <Grid container>
          <Grid item xs={12} sm={5} md={5}>
            <Stack spacing={1} sx={{ color: { sm: "#232323", xs: "white" } }}>
              <Typography
                sx={{ fontSize: { md: "60px", xs: "40px" } }}
                variant="h2"
                fontWeight={700}
              >
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
