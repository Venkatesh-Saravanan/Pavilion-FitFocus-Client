import { useForm } from "react-hook-form";
import { axiosSecure } from "../../Hook/useAxiosSecure";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
const NewsletterSection = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

   
    const onSubmit = (data) => {
      
        
        axiosSecure.post("/newsLatter", {
          ...data,
          date: new Date().toISOString().split('T')[0]
      }, {
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(res=>{
            
            if(res.data.message==0){
                  toast("User already exist");
            }
            else{
                toast("NewsLatter Subscribe successful");
            }
        })
      
    };
    return (
        <div className="mt-20 container mx-auto rounded-xl bg-gradient-to-r from-[#d4d3da] to-white">
            <div className="lg:grid grid-cols-2 ">
                <div className="text-center  p-20">
                    <h1 className="text-2xl font-bold font-Prata">Subscribe Our Newsletter</h1>
                    <h1>Don't Miss Out! Subscribe to Our Newsletter for the Latest Updates, Exclusive Offers, and Insider Tips. Join Our Community Today and Stay Informed!</h1>
                </div>
                <div className="text-center p-20">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full">
             
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered  mb-5"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 ml-1">Name is required.</p>
              )}
            </div>

            <div className="form-control w-full">
             
              <input 
                type="email"
                placeholder={ "Email"}
                className="input input-bordered "
                {...register("user_email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 ml-1">Email is required</p>
              )}
            </div>
            <button className="btn text-white bg-[#1E1743] mt-5" type="submit">Subscribe</button>
        </form>
                </div>
                
            </div>
            <ToastContainer />
        </div>
    );
};

export default NewsletterSection;