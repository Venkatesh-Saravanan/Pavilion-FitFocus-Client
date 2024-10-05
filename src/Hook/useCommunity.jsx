import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";

const useCommunity = () => {
    const { data: posts, isLoading, error, refetch } = useQuery({
        queryKey: ['forumPosts'], 
        queryFn: async () => {
            const res = await axiosSecure.get("/forumPost"); 
            return res.data;
        }
    });

    return { posts, isLoading, error, refetch };
};

export default useCommunity;