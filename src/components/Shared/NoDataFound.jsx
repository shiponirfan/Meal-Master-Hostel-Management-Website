import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const NoDataFound = ({ heading, subHeading }) => {
  return (
    <Stack alignItems={"center"} spacing={0.5}>
      <Typography
        variant="h2"
        fontWeight={900}
        sx={{ color: "#f77f00", display: { xs: "none", md: "flex" } }}
      >
        Oops!
      </Typography>
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        {heading
          ? heading
          : "It seems there is no data available at the moment."}
      </Typography>
      <Typography variant="h6" sx={{ display: { xs: "none", md: "flex" } }}>
        {subHeading
          ? subHeading
          : "Please check back later or try a different search."}
      </Typography>
    </Stack>
  );
};

NoDataFound.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};

export default NoDataFound;
