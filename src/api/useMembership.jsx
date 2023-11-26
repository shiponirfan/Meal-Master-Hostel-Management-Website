import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const useMembership = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: membershipData = [],
    isLoading,
  } = useQuery({
    queryKey: ["membershipData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/membership");
      return res.data;
    },
  });

  return [membershipData, isLoading];
};

export default useMembership;
