import { Button, Container, Stack } from "@mui/material";
import errorIcon from "../../assets/icons/404Error.png";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const ErrorPage = () => {
  return (
    <Container>
      <Helmet>
        <title>404 Not Found - Meal Master</title>
      </Helmet>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ minHeight: "100vh" }}
      >
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ maxWidth: "600px" }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            src={errorIcon}
            alt="logo"
          />
        </Stack>
        <Link to={"/"}>
          <Button variant="outlined" startIcon={<HomeIcon />}>
            Back To Home
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default ErrorPage;
