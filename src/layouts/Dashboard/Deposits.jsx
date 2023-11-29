import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import useUserRole from "./../../api/useUserRole";
import useAuth from "../../hooks/useAuth";
import usePaymentHistory from "../../api/usePaymentHistory";

export default function Deposits() {
  const { user } = useAuth();
  const [userRole] = useUserRole();
  let email = "";
  if (userRole.userRole === "Admin") {
    email = "";
  } else {
    email = user?.email;
  }
  const [paymentHistory] = usePaymentHistory(email);
  const totalSpend = paymentHistory?.reduce(
    (total, item) => total + item.price,
    0
  );
  return (
    <React.Fragment>
      <Title>
        {user && userRole.userRole === "Admin"
          ? "Total Revenue"
          : "Total Spend"}
      </Title>
      <Typography component="p" variant="h4">
        {user && userRole.userRole === "Admin"
          ? `$${totalSpend > 0 ? totalSpend : 0}`
          : `$${totalSpend > 0 ? totalSpend : 0}`}
        .00
      </Typography>
    </React.Fragment>
  );
}
