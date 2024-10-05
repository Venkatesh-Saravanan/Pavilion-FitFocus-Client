import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";


const useRejectedData = () => {
    const { data: rejectedData, isLoading: rejectedgDataLoading, refetch } = useQuery({
        queryKey: ['RejectedgData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/trainer/rejected');
            return res.data;
        }
    });
    return {rejectedData,  rejectedgDataLoading , refetch}
};

export default useRejectedData;