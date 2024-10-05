import { useQuery } from '@tanstack/react-query';
import useAxiosSecurePrivate from './useAxiosSecurePrivate'; 

const useUser = () => {
  const axiosSecurePrivate = useAxiosSecurePrivate(); 

  const { data: users, isLoading, error, refetch } = useQuery('users', async () => {
    const res = await axiosSecurePrivate.get('/users');
    return res.data;
  });

  return { users, isLoading, error, refetch };
};

export default useUser;