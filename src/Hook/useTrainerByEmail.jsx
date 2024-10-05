import { useQuery } from "@tanstack/react-query";
import UseAuth from "./useAuth";
import { axiosSecure } from "./useAxiosSecure";

const useTrainerByEmail = () => {
    const { user } = UseAuth();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['appliedTrainer'],
        queryFn: async () => {
           
            const res = await axiosSecure.get(`/alltrainer/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, 
    });

    return { data, isLoading, error, refetch };
};

export default useTrainerByEmail;