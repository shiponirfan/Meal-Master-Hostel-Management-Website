import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import logoWhite from "../../../assets/logoWhite.png";
import footerBg from "../../../assets/banner/footerbg.jpg";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <Stack
      sx={{
        py: 8,
        background: `linear-gradient(to right, rgba(0, 0, 0, .7), rgba(0, 0, 0, 0.6)),url(${footerBg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        color: "white",
      }}
    >
      <Container maxWidth={"xl"}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Grid item xs={12} lg={7}>
              <Stack spacing={2.5}>
                {/* Logo */}
                <Box>
                  <Link to="/">
                    <img
                      style={{ width: "260px" }}
                      src={logoWhite}
                      alt="logo"
                    />
                  </Link>
                </Box>
                <Typography>
                  Welcome to Meal Master, your trusted companion in hostel
                  living. We&apos;re dedicated to providing delicious and
                  nutritious meals for university students, ensuring a
                  delightful dining experience.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Stack spacing={1}>
              <Typography variant="h5" fontWeight={700}>
                Contacts
              </Typography>
              <Typography>Phone: +8801710467100</Typography>
              <Typography>Email: shiponirfan.dev@gmail.com</Typography>
              <Typography>Address: Rangpur, Bangladesh</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Stack spacing={1}>
              <Typography variant="h5" fontWeight={700}>
                Contacts
              </Typography>
              <Typography>Phone: +8801710467100</Typography>
              <Typography>Email: shiponirfan.dev@gmail.com</Typography>
              <Typography>Address: Rangpur, Bangladesh</Typography>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 5, borderColor: "white" }} />
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Typography>
              © Copyright {new Date().getFullYear()} Meal Master. All rights
              reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { md: "right" } }}>
            <Typography>F.A.Q | Privacy Policy | Terms & Conditions</Typography>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};

export default Footer;
