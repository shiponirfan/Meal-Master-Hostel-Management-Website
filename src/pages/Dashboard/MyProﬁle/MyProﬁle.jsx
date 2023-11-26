import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import useAuth from "./../../../hooks/useAuth";
import bronzeBadge from "../../../assets/icons/bronzebadge.png";
import goldBadge from "../../../assets/icons/goldbadge.png";
import platinumBadge from "../../../assets/icons/platinumbadge.png";
import Badge from "@mui/material/Badge";
import useUserRole from "./../../../api/useUserRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import usePaymentHistory from "../../../api/usePaymentHistory";
import useRequestedMeals from "../../../api/useRequestedMeals";

const MyProﬁle = () => {
  const { user } = useAuth();
  const [userRole] = useUserRole();
  const [paymentHistory, paymentLoading] = usePaymentHistory();
  const [requestedMeal, requestedMealsLoading] = useRequestedMeals();

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
        minWidth: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ background: "white", borderRadius: "20px", p: 10 }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Paper
              elevation={5}
              sx={{
                borderRadius: "100px",
              }}
            >
              <Avatar
                sx={{ width: 60, height: 60 }}
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
            sx={{ width: 200, height: 200, mb: 1 }}
          />
        </Badge>

        <Stack justifyContent={"center"} alignItems={"center"} sx={{ mt: 1 }}>
          <Typography variant="h4" textTransform={"uppercase"} fontWeight={700}>
            {user?.displayName ? user?.displayName : "User Name"}
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            {user?.email ? user?.email : "User Email"}
          </Typography>
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            mt: 3,
            "& > :not(style)": {
              m: 1,
              p: 2,
              width: 200,
            },
          }}
        >
          <Paper elevation={4} sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight={700}>
              ${totalSpend > 0 ? totalSpend : 0}
            </Typography>
            <Typography variant="h6">Total Spend</Typography>
          </Paper>
          <Paper elevation={4} sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight={700}>
              {requestedMeal?.length > 0 ? requestedMeal?.length : 0}
            </Typography>
            <Typography variant="h6">Requested Meals</Typography>
          </Paper>
          <Paper elevation={4} sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight={700}>
              0
            </Typography>
            <Typography variant="h6">My Reviews</Typography>
          </Paper>
        </Box>
      </Stack>
    </Stack>
  );
};

export default MyProﬁle;
