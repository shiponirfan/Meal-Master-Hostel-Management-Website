import { useParams } from "react-router-dom";
import useMembership from "../../api/useMembership";
import { Box, Stack, Typography } from "@mui/material";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_SECRET);
const Checkout = () => {
  const { id } = useParams();
  const [membershipData, isLoading] = useMembership();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const selectedPackage = membershipData.find((item) => item._id === id);
  return (
    <Stack sx={{ py: 10 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          mb: 2,
        }}
      >
        <Typography
          component="h2"
          variant="h3"
          color="text.primary"
          sx={{ fontWeight: 700 }}
        >
          {selectedPackage.title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          mb: 2,
        }}
      >
        <Typography
          component="h2"
          variant="h3"
          color="text.primary"
          sx={{ fontWeight: 700 }}
        >
          ${selectedPackage.price}
        </Typography>
        <Typography
          sx={{ fontWeight: 600 }}
          variant="h6"
          color="text.secondary"
        >
          /mo
        </Typography>
      </Box>
      <Stack>
        <Elements stripe={stripePromise}>
          <CheckoutForm selectedPackage={selectedPackage} />
        </Elements>
      </Stack>
    </Stack>
  );
};

export default Checkout;
