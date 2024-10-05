import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecurePrivate from "./useAxiosSecurePrivate";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecurePrivate = useAxiosSecurePrivate();

    const { data: isAdmin, isLoading: isAdminLoading, error } = useQuery({
        queryKey: ['isAdmin', user?.email], // Changed order to avoid accessing undefined user.email
        enabled: !loading && !!user?.email, // Ensure user.email is defined before enabling query
        queryFn: async () => {
            try {
               
                if (!user || !user.email) {
                    throw new Error('User or user email is undefined');
                }
                const res = await axiosSecurePrivate.get(`/users/admin/${user.email}`);
                return res.data?.admin;
            } catch (error) {
                throw new Error(`Failed to fetch admin status: ${error.message}`);
            }
        },
    });

    return { isAdmin, isAdminLoading, error };
};

export default useAdmin;