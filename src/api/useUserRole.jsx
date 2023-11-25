import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userRole, isLoading: isUserRoleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/auth/user/${user?.email}`);
      return res.data;
    },
  });
  return [userRole, isUserRoleLoading];
};

export default useUserRole;
