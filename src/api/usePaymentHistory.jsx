import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const usePaymentHistory = (email) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isLoading: paymentLoading, data: paymentHistory } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/auth/payments-history?email=${email}`
      );
      return res.data;
    },
  });

  return [paymentHistory, paymentLoading];
};

export default usePaymentHistory;
