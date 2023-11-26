import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const useRequestedMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isLoading: requestedMealsLoading, data: requestedMeal, refetch: requestedMealRefetch } = useQuery({
    queryKey: ["requestedMeal", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/auth/requested-meal/${user?.email}`);
      return res.data;
    },
  });

  return [requestedMeal, requestedMealsLoading, requestedMealRefetch];
};

export default useRequestedMeals;
