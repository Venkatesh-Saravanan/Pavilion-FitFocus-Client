import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";

const useTrainers = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['appliedTrainer'],
    queryFn: async () => {
        const res = await axiosSecure.get('/trainer/trainer')
      return res.data;
    }
  });

  return { data, isLoading, error, refetch };
};

export default useTrainers;