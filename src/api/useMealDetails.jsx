import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useMealDetails = (id) => {
  const axiosSecure = useAxiosSecure();
  const { data: mealDetails, isLoading } = useQuery({
    queryKey: ["mealDetails"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal/${id}`);
      return res.data;
    },
  });

  return [mealDetails, isLoading];
};

export default useMealDetails;
