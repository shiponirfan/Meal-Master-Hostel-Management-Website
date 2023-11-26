import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AwesomeButton } from "react-awesome-button";
import GoogleIcon from "@mui/icons-material/Google";
import useAuth from "./../../hooks/useAuth";
import toast from "react-hot-toast";
const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      const userInformation = {
        userName: result?.user?.displayName,
        userEmail: result?.user?.email,
        userBadge: "Bronze-Badge",
        userRole: "User",
      };
      axiosPublic.post("/auth/users", userInformation).then((res) => {
        if (res.data.insertedId) {
          toast.success("Signed Up Successfully");
          navigate(from, { replace: true });
        }
        if (res.data.insertedId === null) {
          toast.success("Login Successfully");
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
