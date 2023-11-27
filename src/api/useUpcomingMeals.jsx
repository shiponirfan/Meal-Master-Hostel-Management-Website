import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const useUpcomingMeals = ({ mealType, mealTitle, sort, pages, limit }) => {
  const axiosPublic = useAxiosPublic();
  const {
    refetch,
    data: upcomingMeals = [],
    isLoading,
  } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const res = await axiosPublic.get("/upcoming-meals", {
        params: {
          mealType,
          mealTitle,
          sort,
          pages,
          limit,
        },
      });
      return res.data.result;
    },
  });

  return [upcomingMeals, refetch, isLoading];
};

export default useUpcomingMeals;
