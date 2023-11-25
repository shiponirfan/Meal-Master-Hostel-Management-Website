import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { AwesomeButton } from "react-awesome-button";
import GoogleIcon from "@mui/icons-material/Google";
import useAuth from "./../../hooks/useAuth";
const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      const userInformation = {
        userName: result.displayName,
        userEmail: result.email,
        userBadge: "Bronze-Badge",
        userRole: "User",
      };
      axiosPublic.post("/auth/users", userInformation).then((res) => {
        if (res.data.insertedId) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Login Successfully",
          });
          navigate(from, { replace: true });
        }
        if (res.data.insertedId === null) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Login Successfully",
          });
          navigate(from, { replace: true });
        }
      });
    });
  };
  return (
    <AwesomeButton
      onPress={handleGoogleLogin}
      style={{ width: "100%", marginBottom: "10px" }}
      type="secondary"
      after={<GoogleIcon />}
    >
      Login With Google
    </AwesomeButton>
  );
};

export default SocialLogin;
