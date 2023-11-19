import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

function useAdmin() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/user/admin/${user.email}`);
      console.log(res.data);
      return res.data?.admin;
    },
    queryKey: ["isAdmin", user?.email],
  });
  return { isAdmin, isAdminLoading };
}

export default useAdmin;
