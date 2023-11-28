import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { Stack } from "@mui/material";
import { AwesomeButton } from "react-awesome-button";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import HeadingTitle from "../Shared/HeadingTitle";
import useMembership from "../../api/useMembership";
import { Link } from "react-router-dom";

export default function Membership() {
  const [membershipData] = useMembership();
  return (
    <Stack sx={{ py: 10, backgroundColor: "#f77f0010" }}>
      {/* Heading Title */}
      <HeadingTitle
        titleOne={"Member"}
        titleSecond={"ship"}
        desc={"Choose The Best Offer For You"}
      />
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <Container maxWidth="lg" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {membershipData.map((data) => (
            <Grid
              item
              key={data.title}
              xs={12}
              sm={data.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={data.title}
                  subheader={data.subheader}
                  titleTypographyProps={{ align: "center", fontWeight: 700 }}
                  action={
                    data.title === "Gold" ? <WorkspacePremiumIcon /> : null
                  }
                  subheaderTypographyProps={{
                    align: "center",
                    color: "white",
                  }}
                  sx={{
                    backgroundColor: "#f77f00",
                    color: "white",
                  }}
                />
                <CardContent>
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
                      ${data.price}
                    </Typography>
                    <Typography
                      sx={{ fontWeight: 600 }}
                      variant="h6"
                      color="text.secondary"
                    >
                      /mo
                    </Typography>
                  </Box>
                  <ul style={{ listStyle: "none" }}>
                    {data.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Link style={{ width: "100%" }} to={`/checkout/${data._id}`}>
                    <AwesomeButton
                      style={{ width: "100%" }}
                      type={data.buttonVariant}
                    >
                      {data.buttonText}
                    </AwesomeButton>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
}
