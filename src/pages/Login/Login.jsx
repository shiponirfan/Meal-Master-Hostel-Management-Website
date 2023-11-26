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
        toast.success('Login Successfully')
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message)
      });
  };

  return (
    <Stack sx={{ minHeight: "100vh" }} justifyContent={"center"}>
      <Container maxWidth={"xl"}>
        <Grid container>
          <Grid item xs={6}>
            <Box>
              <img style={{ width: "600px" }} src={loginIcon} alt="logo" />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
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
                <Box maxWidth="xs">
                  <Divider sx={{ my: 1.5 }}>OR LOGIN WITH GOOGLE</Divider>
                  <SocialLogin />
                  <Link
                    style={{ color: "#f77f55", fontWeight: 700 }}
                    to="/register"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Box>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}
