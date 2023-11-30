import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import { Button, Divider, Stack } from "@mui/material";
import logo from "../../assets/logo.png";
import loginIcon from "../../assets/icons/signup.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import SocialLogin from "../../components/Shared/SocialLogin";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
const image_hosting_key = import.meta.env.VITE_IMGBB_ACCESS_TOKEN;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { userSignUp, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data.profileImage[0] };

    const imageRes = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (imageRes.data.success) {
      userSignUp(data.email, data.password).then(() => {
        updateUserProfile(data.name, imageRes.data.data.display_url)
          .then(() => {
            const userInformation = {
              userName: data.name,
              userEmail: data.email,
              userBadge: "Bronze-Badge",
              userRole: "User",
            };
            axiosPublic.post("/auth/users", userInformation).then((res) => {
              if (res.data.insertedId) {
                toast.success("Signed Up Successfully");
                navigate(from, { replace: true });
              }
            });
          })
          .catch((err) => {
            toast.error(err.message);
          });
      });
    }
  };

  return (
    <Stack
      sx={{ minHeight: "100vh", width: "100%" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Helmet>
        <title>Register - Meal Master</title>
      </Helmet>
      <Container maxWidth={"xl"}>
        <Stack
          sx={{
            my: 3,
            boxShadow: {
              xs: "none",
              md: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
            },
          }}
          className="login-box-container"
        >
          <Grid
            spacing={5}
            justifyContent={"center"}
            alignItems={"center"}
            container
          >
            <Grid
              sx={{ display: { xs: "none", md: "grid" } }}
              item
              xs={12}
              md={6}
            >
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
                      id="name"
                      label="Your Name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <Typography
                        variant="h6"
                        component={"span"}
                        sx={{ fontSize: "1rem" }}
                        color={"secondary"}
                      >
                        Name is required
                      </Typography>
                    )}
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
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern:
                          /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      })}
                    />
                    {errors.password?.type === "required" && (
                      <Typography
                        variant="h6"
                        component={"span"}
                        sx={{ fontSize: "1rem" }}
                        color={"secondary"}
                      >
                        Password is required
                      </Typography>
                    )}
                    {errors.password?.type === "minLength" && (
                      <Typography
                        variant="h6"
                        component={"span"}
                        sx={{ fontSize: "1rem" }}
                        color={"secondary"}
                      >
                        Password Minimum 6 Characters
                      </Typography>
                    )}
                    {errors.password?.type === "maxLength" && (
                      <Typography
                        variant="h6"
                        component={"span"}
                        sx={{ fontSize: "1rem" }}
                        color={"secondary"}
                      >
                        Password Can Not Be More Then 20 Characters
                      </Typography>
                    )}
                    {errors.password?.type === "pattern" && (
                      <Typography
                        variant="h6"
                        component={"span"}
                        sx={{ fontSize: ".9rem" }}
                        color={"secondary"}
                      >
                        Password Must Be One Uppercase, Lowercase & Number
                      </Typography>
                    )}
                    <Stack direction={"row"} alignItems={"center"}>
                      <Button
                        sx={{ mt: 0.5, textTransform: "none" }}
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload Profile Image
                        <VisuallyHiddenInput
                          {...register("profileImage", { required: true })}
                          type="file"
                        />
                      </Button>
                      {errors.profileImage && (
                        <Typography
                          variant="h6"
                          component={"span"}
                          sx={{ fontSize: "1rem", ml: 1 }}
                          color={"secondary"}
                        >
                          Profile Image is required
                        </Typography>
                      )}
                    </Stack>
                    <Box sx={{ mt: 1.6 }}>
                      <AwesomeButton style={{ width: "100%" }} type="primary">
                        Sign Up
                      </AwesomeButton>
                    </Box>
                  </Box>
                  <Box maxWidth="sm">
                    <Divider sx={{ my: 1.5 }}>OR SIGN UP WITH GOOGLE</Divider>
                    <SocialLogin />
                    <Link
                      style={{ color: "#f77f55", fontWeight: 700 }}
                      to="/login"
                    >
                      {"Already have an account? Login"}
                    </Link>
                  </Box>
                </Box>
              </Container>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Register;
