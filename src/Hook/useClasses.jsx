import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";


const useClasses = () => {
    const { data: classes, isLoading: classesLoading } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/NewClass');
            return res.data;
        }
    });
    return {classes,  classesLoading}
};

export default useClasses;