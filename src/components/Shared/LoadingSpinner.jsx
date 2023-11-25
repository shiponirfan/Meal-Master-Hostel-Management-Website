import { Stack } from "@mui/material";
import SyncLoader from "react-spinners/SyncLoader";
const LoadingSpinner = () => {
  return (
    <Stack>
      <SyncLoader color="#f77f00" />
    </Stack>
  );
};

export default LoadingSpinner;
