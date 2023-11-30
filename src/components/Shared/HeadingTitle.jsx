import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const HeadingTitle = ({ titleOne, titleSecond, desc }) => {
  return (
    <Stack sx={{ mb: 5, alignItems: "center" }}>
      <Typography
        className="norican"
        variant="h1"
        fontWeight={700}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: {sm: "1.5rem", xs: '0.8rem'},
          mb: 1,
          fontSize: { sm: "96px", xs: "50px" }
        }}
      >
        {titleOne}
        <Typography
          className="norican"
          variant="h1"
          component="span"
          fontWeight={700}
          color={"primary"}
          sx={{fontSize: { sm: "96px", xs: "50px" }}}
        >
          {titleSecond}
        </Typography>
      </Typography>
      <Typography textAlign={'center'} variant="body1">{desc}</Typography>
    </Stack>
  );
};
HeadingTitle.propTypes = {
  titleOne: PropTypes.string,
  titleSecond: PropTypes.string,
  desc: PropTypes.string,
};

export default HeadingTitle;
