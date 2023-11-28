import { useParams } from "react-router-dom";
import useMembership from "../../api/useMembership";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import BreadcrumbsSection from "../../components/Shared/Breadcrumbs/BreadcrumbsSection";
import featuredImg from "../../assets/banner/payment.jpg";
import checkoutIcon from "../../assets/icons/paymenticon.png";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_SECRET);
const Checkout = () => {
  const { id } = useParams();
  const [membershipData, isLoading] = useMembership();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const selectedPackage = membershipData.find((item) => item._id === id);
  return (
    <Box>
      <BreadcrumbsSection
        mealTitle={"Checkout"}
        breadcrumbs={"Checkout"}
        mealImage={featuredImg}
      />
      <Stack sx={{ py: 10 }}>
        <Container maxWidth={"xl"}>
          <Grid
            justifyContent={"center"}
            alignItems={"center"}
            container
            spacing={10}
          >
            <Grid item xs={12} md={6}>
              <Box sx={{ height: "600px" }}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={checkoutIcon}
                  alt="about us"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                sx={{
                  backgroundColor: "#f77f00",
                  color: "white",
                  py: 2,
                  px: 10,
                  borderRadius: 2,
                  mb: 2,
                }}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack>
                  <Typography
                    component="h2"
                    variant="h3"
                    sx={{ fontWeight: 700 }}
                  >
                    {selectedPackage.title}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }} variant="h6">
                    {selectedPackage.subheader}
                  </Typography>
                </Stack>
                <Stack direction={"row"} alignItems={"end"}>
                  <Typography
                    component="h2"
                    variant="h3"
                    sx={{ fontWeight: 700 }}
                  >
                    ${selectedPackage.price}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }} variant="h6">
                    /mo
                  </Typography>
                </Stack>
              </Stack>
              <Elements stripe={stripePromise}>
                <CheckoutForm selectedPackage={selectedPackage} />
              </Elements>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </Box>
  );
};

export default Checkout;
