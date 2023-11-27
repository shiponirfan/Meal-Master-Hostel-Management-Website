import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const useReviews = (email) => {
  const axiosPublic = useAxiosPublic();
  const { data: allReviews, isLoading: reviewLoading, refetch: reviewRefetch } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews?email=${email}`);
      return res.data;
    },
  });

  return [allReviews, reviewLoading, reviewRefetch];
};

export default useReviews;
