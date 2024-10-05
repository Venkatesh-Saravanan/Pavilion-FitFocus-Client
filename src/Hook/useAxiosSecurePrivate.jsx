import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecurePrivte = axios.create({
    baseURL: 'https://server-blue-seven.vercel.app'
})
const useAxiosSecurePrivate = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecurePrivte.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        
        return Promise.reject(error);
    });


    // intercepts 401 and 403 status
    axiosSecurePrivte.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
      
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    })


    return axiosSecurePrivte;
};

export default useAxiosSecurePrivate;