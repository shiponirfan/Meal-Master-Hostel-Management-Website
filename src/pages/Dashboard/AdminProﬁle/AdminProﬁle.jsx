import { Avatar, Box, Chip, Paper, Stack, Typography } from "@mui/material";
import useAuth from "./../../../hooks/useAuth";
import bronzeBadge from "../../../assets/icons/bronzebadge.png";
import goldBadge from "../../../assets/icons/goldbadge.png";
import platinumBadge from "../../../assets/icons/platinumbadge.png";
import Badge from "@mui/material/Badge";
import useUserRole from "./../../../api/useUserRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useMeals from "../../../api/useMeals";
import { Helmet } from "react-helmet-async";

const AdminProﬁle = () => {
  const { user } = useAuth();
  const [userRole] = useUserRole();
  const [meals, , isLoading] = useMeals("");
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Stack
    sx={{
      minHeight: "calc(100vh - 64px)",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    }}
    >
      <Helmet>
        <title>Profile - Dashboard</title>
      </Helmet>
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
            mt: 3,
            "& > :not(style)": {
              m: 1,
              p: 2,
            },
          }}
        >
          <Paper className="my-profile-paper" elevation={4} sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight={700}>
              {meals?.result?.length}
            </Typography>
            <Typography variant="h6">Total Meals Added</Typography>
          </Paper>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AdminProﬁle;
