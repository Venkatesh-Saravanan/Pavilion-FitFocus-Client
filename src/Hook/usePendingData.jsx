import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";


const usePendingData = () => {
    const { data: pendingData, isLoading: pendingDataLoading, refetch } = useQuery({
        queryKey: ['PendingData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/trainer/pending');
            return res.data;
        }
    });
    return {pendingData,  pendingDataLoading , refetch}
};

export default usePendingData;