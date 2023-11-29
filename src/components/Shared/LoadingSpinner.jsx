import { Stack } from "@mui/material";
import SyncLoader from "react-spinners/SyncLoader";
const LoadingSpinner = () => {
  return (
    <Stack
      sx={{ width: "100%", height: "100%", py: 10 }}
      alignItems={"center"}
    >
      <SyncLoader color="#f77f00" />
    </Stack>
  );
};

export default LoadingSpinner;
