import { Typography } from "@mui/material";
import { AwesomeButton } from "react-awesome-button";
import useUserRole from "../../api/useUserRole";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RequestMealButton = ({ mealId }) => {
  const { user } = useAuth();
  const [userRole] = useUserRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [requestedMealInfo, setRequestedMealInfo] = useState("");
  const { mutate: userRequestedMeal } = useMutation({
    mutationKey: ["userRequestedMeal"],
    mutationFn: async () => {
      return await axiosSecure.post("/requested-meal", requestedMealInfo);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Meal Requested Successfully!",
        icon: "success",
      });
    },
  });
  const handleRequestMeal = () => {
    if (!user) {
      return Swal.fire({
        title: "You Need To Login First",
        text: "After Login You Can Request Meal",
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Close",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          return navigate("/login", { state: { from: location } });
        }
      });
    }
    if (userRole.userBadge === "Bronze-Badge") {
      return Swal.fire({
        title: "Membership Required!",
        text: "You Need Membership For Meal Request",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Select Membership",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/membership");
        }
      });
    }
    const userRequestedMealData = {
      mealId: mealId,
      userName: user?.displayName,
      userEmail: user?.email,
      status: "Pending",
    };
    setRequestedMealInfo(userRequestedMealData);
    userRequestedMeal();
  };
  return (
    <AwesomeButton
      onPress={handleRequestMeal}
      className="like-btn"
      type="primary"
    >
      <Typography variant="h6" fontWeight={700}>
        Request Meal
      </Typography>
    </AwesomeButton>
  );
};

RequestMealButton.propTypes = {
  mealId: PropTypes.string,
};

export default RequestMealButton;
