import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const useRequestedMeals = (userEmail) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isLoading: requestedMealsLoading, data: requestedMeal, refetch: requestedMealRefetch } = useQuery({
    queryKey: ["requestedMeal", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/auth/requested-meal?email=${userEmail}`);
      return res.data;
    },
  });

  return [requestedMeal, requestedMealsLoading, requestedMealRefetch];
};

export default useRequestedMeals;
