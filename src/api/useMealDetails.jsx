import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const useMealDetails = (id) => {
  const axiosPublic = useAxiosPublic();
  const { data: mealDetails, isLoading } = useQuery({
    queryKey: ["mealDetails"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meal/${id}`);
      return res.data;
    },
  });

  return [mealDetails, isLoading];
};

export default useMealDetails;
