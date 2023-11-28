import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const useMeals = ({ mealType,mealTitle,sort,pages,limit }) => {
  const axiosPublic = useAxiosPublic();
  const { refetch, data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosPublic.get("/meals", {
        params: {
          mealType,
          mealTitle,
          sort,
          pages,
          limit,
        },
      });
      return res.data;
    },
  });

  return [meals, refetch, isLoading];
};

export default useMeals;
