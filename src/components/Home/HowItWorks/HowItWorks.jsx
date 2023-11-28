import { Container, Grid, Paper, Stack, Typography } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import PostAddIcon from "@mui/icons-material/PostAdd";
const HowItWorks = () => {
  return (
    <Stack
      sx={{
        py: 12,
        background: "#fef7ef",
        textAlign: "center",
      }}
    >
      <Container maxWidth={"xl"}>
        <Grid container spacing={4}>
          <Grid item xs={12} sx={{ pb: 3 }}>
            <Typography variant="h5" fontWeight={700} sx={{ color: "#f77f00" }}>
              How It Works!
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              Delicious Hostel Dining
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: "20px",
                cursor: "pointer",
                transition: "all .300s ",
                "&:hover": {
                  bgcolor: "#f77f00",
                  color: "#fff",
                  "& .MuiSvgIcon-root": {
                    color: "#fff",
                  },
                },
              }}
            >
              <RamenDiningIcon sx={{ fontSize: "100px", color: "#f77f00" }} />
              <Stack spacing={1}>
                <Typography variant="h5" fontWeight={700}>
                  Menu Selection
                </Typography>
                <Typography variant="body1">
                  Select from a variety of mouth-watering meal options curated
                  for your taste and dietary preferences.
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: "20px",
                cursor: "pointer",
                transition: "all .300s ",
                "&:hover": {
                  bgcolor: "#f77f00",
                  color: "#fff",
                  "& .MuiSvgIcon-root": {
                    color: "#fff",
                  },
                },
              }}
            >
              <RestaurantIcon sx={{ fontSize: "100px", color: "#f77f00" }} />
              <Stack spacing={1}>
                <Typography variant="h5" fontWeight={700}>
                  Seamless Orders
                </Typography>
                <Typography variant="body1">
                  Select from a variety of mouth-watering meal options curated
                  for your taste and dietary preferences.
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: "20px",
                cursor: "pointer",
                transition: "all .300s ",
                "&:hover": {
                  bgcolor: "#f77f00",
                  color: "#fff",
                  "& .MuiSvgIcon-root": {
                    color: "#fff",
                  },
                },
              }}
            >
              <DeliveryDiningIcon
                sx={{ fontSize: "100px", color: "#f77f00" }}
              />
              <Stack spacing={1}>
                <Typography variant="h5" fontWeight={700}>
                  Reliable Deliveries
                </Typography>
                <Typography variant="body1">
                  Select from a variety of mouth-watering meal options curated
                  for your taste and dietary preferences.
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: "20px",
                cursor: "pointer",
                transition: "all .300s ",
                "&:hover": {
                  bgcolor: "#f77f00",
                  color: "#fff",
                  "& .MuiSvgIcon-root": {
                    color: "#fff",
                  },
                },
              }}
            >
              <PostAddIcon sx={{ fontSize: "100px", color: "#f77f00" }} />
              <Stack spacing={1}>
                <Typography variant="h5" fontWeight={700}>
                  Trackable Meals
                </Typography>
                <Typography variant="body1">
                  Select from a variety of mouth-watering meal options curated
                  for your taste and dietary preferences.
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};

export default HowItWorks;
