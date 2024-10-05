import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";
import UseAuth from "./useAuth";


const useUserByEmail = () => {
    const {user} =UseAuth()
    const { data, isLoading, error, refetch } = useQuery({
      queryKey: ['User'],
      queryFn: async () => {
        if (user && user.email) {
          const res = await axiosSecure.get(`/users/${user.email}`);
          return res.data;
        }
        return null;
      },
      enabled: !!user,
    });
    
      return { data, isLoading, error, refetch };
    };


export default useUserByEmail;