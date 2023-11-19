import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

function useCart() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //tans tack query
  const {
    data: carts,
    isLoading,
    refetch: cartsRefetch,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/allCartsItem?email=${user.email}`
      );
      return res.data;
    },
    queryKey: ["allCarts", user?.email],
  });
  return { carts, isLoading, cartsRefetch };
}

export default useCart;
