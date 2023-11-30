import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import { Divider, Stack } from "@mui/material";
import logo from "../../assets/logo.png";
import loginIcon from "../../assets/icons/login.png";
import useAuth from "./../../hooks/useAuth";
import SocialLogin from "../../components/Shared/SocialLogin";
import toast from "react-hot-toast";

export default function Login() {
  const { userLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    userLogin(data.email, data.password)
      .then(() => {
        toast.success("Login Successfully");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Stack
      sx={{ minHeight: "100vh", width: "100%" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Container maxWidth={"xl"}>
        <Stack sx={{my:3, boxShadow: {xs: 'none', md: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`}}} className="login-box-container">
          <Grid
            spacing={5}
            justifyContent={"center"}
            alignItems={"center"}
            container
          >
            <Grid sx={{display: {xs: 'none', md: 'grid'}}} item xs={12} md={6}>
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ minWidth: "300px" }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={loginIcon}
                  alt="logo"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Container className="login-box" maxWidth="sm">
                <CssBaseline />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/* Logo */}
                  <Box>
                    <Link to="/">
                      <img style={{ width: "200px" }} src={logo} alt="logo" />
                    </Link>
                  </Box>

                  <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <Typography
                        variant="h6"
                        component={"span"}
                        sx={{ fontSize: "1rem" }}
                        color={"secondary"}
                      >
                        Email is required
                      </Typography>
                    )}
                    <TextField
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <Typography
                        variant="h6"
                        component={"span"}
                        sx={{ fontSize: "1rem" }}
                        color={"secondary"}
                      >
                        Password is required
                      </Typography>
                    )}
                    <Box sx={{ mt: 1.6 }}>
                      <AwesomeButton style={{ width: "100%" }} type="primary">
                        Login
                      </AwesomeButton>
                    </Box>
                  </Box>
                  <Container maxWidth="sm">
                    <Divider sx={{ my: 1.5 }}>OR LOGIN WITH GOOGLE</Divider>
                    <SocialLogin />
                    <Link
                      style={{ color: "#f77f55", fontWeight: 700 }}
                      to="/register"
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Container>
                </Box>
              </Container>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Stack>
  );
}
