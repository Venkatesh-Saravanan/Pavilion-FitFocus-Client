import axios from "axios";

export const axiosSecure = axios.create({
    baseURL: 'https://server-blue-seven.vercel.app'
    // baseURL: 'http://localhost:5173'

})

const useAxiosSecure = () => {
   return axiosSecure
};

export default useAxiosSecure;