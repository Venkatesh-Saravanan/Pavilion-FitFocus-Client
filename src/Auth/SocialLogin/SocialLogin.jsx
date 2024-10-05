import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import { axiosSecure } from "../../Hook/useAxiosSecure";
const SocialLogin = () => {
  
    const {googleLogin,githubLogin,setLoading} = UseAuth()
    const location = useLocation();
    const navigate = useNavigate()
   const handleGoogleLogin=()=>{
    googleLogin()
    .then((users)=>{
        const data={
            name : users.user.displayName,
            email: users.user.email,
            photoURL: users.user.photoURL, 
          role: "user"
        }
        console.log(data)
        axiosSecure.post("/users", data)
        console.log(location?.state)
        navigate(location?.state?.from || "/");
        setLoading(false)
    })
    .catch((error)=>{
        setLoading(false)
       console.log(error.Message);
       Swal.fire(`${error}`);
    })
}
   const handleGithubLogin=()=>{
   
    githubLogin()
    .then((users)=>{
        const data={
            name : users.user.displayName,
            email: users.user.email,
            photoURL: users.user.photoURL, // Corrected here
          role: "user"
        }
        console.log(data)
        axiosSecure.post("/users", data)
        navigate(location?.state ? location.state : "/");
        setLoading(false)
    })
    .catch((error)=>{
        toast.error(error.Message);
        setLoading(false)
    })
}
    
    return (
        <div>
            <div className="lg:w-[40%] md:w-[30%] w-[60%] mx-auto font-bold"><p>---------- OR  ---------</p></div>
            <div className="form-control mt-6">
          <button onClick={handleGoogleLogin} type="submit" className="btn text-xl bg-slate-300"><FcGoogle />Google </button>
          <button onClick={handleGithubLogin} type="submit" className="btn text-xl mt-5 bg-slate-300"><FaGithub />Github </button>
        </div>
        <ToastContainer></ToastContainer>
        </div>
    );
};

export default SocialLogin;