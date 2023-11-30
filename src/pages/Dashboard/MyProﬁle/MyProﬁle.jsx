import { Avatar, Box, Chip, Paper, Stack, Typography } from "@mui/material";
import useAuth from "./../../../hooks/useAuth";
import bronzeBadge from "../../../assets/icons/bronzebadge.png";
import goldBadge from "../../../assets/icons/goldbadge.png";
import platinumBadge from "../../../assets/icons/platinumbadge.png";
import Badge from "@mui/material/Badge";
import useUserRole from "./../../../api/useUserRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import usePaymentHistory from "../../../api/usePaymentHistory";
import useRequestedMeals from "../../../api/useRequestedMeals";
import useReviews from "../../../api/useReviews";

const MyProﬁle = () => {
  const { user } = useAuth();
  const email = user?.email;
  const [allReviews] = useReviews(email);
  const [userRole] = useUserRole();
  const [paymentHistory, paymentLoading] = usePaymentHistory(user?.email);
  const [requestedMeal, requestedMealsLoading] = useRequestedMeals(
    user?.email,
    "",
    "",
    ""
  );

  if (paymentLoading || requestedMealsLoading) {
    return <LoadingSpinner />;
  }
  const totalSpend = paymentHistory.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <Stack
      sx={{
        minHeight: "calc(100vh - 64px)",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        className="my-profile-container"
        sx={{ background: "white", borderRadius: "20px", p: {xs: 2, lg: 10, md: 4} }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Paper
              elevation={2}
              sx={{
                borderRadius: "100px",
              }}
            >
              <Avatar
                sx={{ width: {xs: 30, sm: 60}, height: {xs: 30, sm: 60} }}
                src={
                  userRole.userBadge === "Platinum-Badge"
                    ? platinumBadge
                    : userRole.userBadge === "Gold-Badge"
                    ? goldBadge
                    : bronzeBadge
                }
              />
            </Paper>
          }
        >
          <Avatar
            src={user?.photoURL ? user.photoURL : ""}
            sx={{ width: {xs: 100, sm: 200}, height: {xs: 100, sm: 200}, mb: 1 }}
          />
        </Badge>

        <Stack justifyContent={"center"} alignItems={"center"} sx={{ mt: 1 }}>
          <Typography sx={{fontSize: {xs: "20px", sm: "34px"}}} variant="h4" textTransform={"uppercase"} fontWeight={700}>
            {user?.displayName ? user?.displayName : "User Name"}
          </Typography>
          <Typography sx={{fontSize: {xs: "16px", sm: "20px"}}} variant="h6" fontWeight={700}>
            {user?.email ? user?.email : "User Email"}
          </Typography>
          <Chip
            sx={{
              fontWeight: 500,
              color: "white",
              mt: 1,
              background: `linear-gradient(90deg, rgba(0, 146, 255, 1) 0%, rgba(7, 58, 187, 1) 100%)`,
            }}
            label={
              userRole.userBadge === "Platinum-Badge"
                ? "Platinum Member"
                : userRole.userBadge === "Gold-Badge"
                ? "Gold Member"
                : "Bronze Member"
            }
            color="primary"
          />
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
            "& > :not(style)": {
              m: 1,
              p: 2,
              width: 200,
            },
          }}
        >
          <Paper
            className="my-profile-paper"
            elevation={0}
            sx={{ textAlign: "center" }}
          >
            <Typography variant="h3" fontWeight={700}>
              ${totalSpend > 0 ? totalSpend : 0}
            </Typography>
            <Typography variant="h6">Total Spend</Typography>
          </Paper>
          <Paper
            className="my-profile-paper"
            elevation={4}
            sx={{ textAlign: "center" }}
          >
            <Typography variant="h3" fontWeight={700}>
              {requestedMeal?.data?.length > 0
                ? requestedMeal?.data?.length
                : 0}
            </Typography>
            <Typography variant="h6">Requested Meals</Typography>
          </Paper>
          <Paper
            className="my-profile-paper"
            elevation={4}
            sx={{ textAlign: "center" }}
          >
            <Typography variant="h3" fontWeight={700}>
              {allReviews?.result?.length > 0 ? allReviews?.result?.length : 0}
            </Typography>
            <Typography variant="h6">My Reviews</Typography>
          </Paper>
        </Box>
      </Stack>
    </Stack>
  );
};

export default MyProﬁle;
