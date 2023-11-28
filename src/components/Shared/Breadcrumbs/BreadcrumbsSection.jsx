import { Container, Grid, Stack, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PropTypes from "prop-types";
const BreadcrumbsSection = ({ mealTitle, mealImage, breadcrumbs }) => {
  return (
    <Stack
      sx={{
        py: 10,
        background: `linear-gradient(to right, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0.8)),url(${mealImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth={"xl"}>
        <Grid container>
          <Grid item xs={12} textAlign={"center"}>
            <Typography sx={{ color: "white" }} variant="h3" fontWeight={700}>
              {mealTitle}
            </Typography>
            <Stack
              justifyContent={"center"}
              direction={"row"}
              spacing={1}
              sx={{ color: "white", mt: 1 }}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{ color: "white" }}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home /
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{ color: "white" }}
              >
                <FastfoodIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                {breadcrumbs ? breadcrumbs : "Meal Details"}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};
BreadcrumbsSection.propTypes = {
  mealTitle: PropTypes.string,
  mealImage: PropTypes.string,
  breadcrumbs: PropTypes.string,
};
export default BreadcrumbsSection;
