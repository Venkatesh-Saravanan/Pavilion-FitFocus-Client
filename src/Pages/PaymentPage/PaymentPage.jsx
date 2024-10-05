import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import UseAuth from "../../Hook/useAuth";
import { axiosSecure } from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecurePrivate from "../../Hook/useAxiosSecurePrivate";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const PaymentPage = () => {
    const { user } = UseAuth()
    const [price, setPrice] =useState(0)
    const location = useLocation();
   
    const { formData } = location.state || {};



    const { data: classe, isLoading: classesLoading, refetch } = useQuery({
        queryKey: ['classe', formData?.selectedClass],
        queryFn: async () => {
            const res = await axiosSecure.get(`/NewClass/${formData?.selectedClass}`);
            return res.data;
        },
        enabled: !!formData?.selectedClass
    });


   
    useEffect(() => {
        if (formData) {
          
            if (formData.package === 'basic') {
                setPrice(10);
            } else if (formData.package === 'standard') {
                setPrice(50);
            } else if (formData.package === 'premium') {
                setPrice(100);
            }
        }
    }, [formData]);


    return (
        <div>
            <div className="flex mb-20 pb-10 font-Rilway text-xl flex-col px-10 mx-auto bg-slate-200 mt-10 max-w-5xl pt-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">

                <div className="">
                    <div className="text-center font-bold text-2xl  text-[#2F7955]">
                        Confirm and Pay
                    </div>
                    <div>
                        <img className="" src="https://i.ibb.co/2Mc8bJd/images-removebg-preview-1.png" alt="" />
                    </div>
                </div>
                <div className="lg:grid grid-cols-2 gap-20">
                    <div>
                
                        <div className="shadow-2xl p-10 py-10 rounded-xl ">
                        <div className="block  text-gray-700 pb-5 font-bold text-base" htmlFor="trainerName">C-Name:   <span className="font-normal ml-3 text-gray-500" >{user?.displayName}</span> </div>
                        <div className="block  text-gray-700 pb-10 font-bold text-base" htmlFor="trainerName">C-Mail:   <span className="font-normal ml-3 text-gray-500 " >{user?.email}</span> </div>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm formDatas={formData} price={price} classe={classe}></CheckoutForm>
                            </Elements>
                        </div>

                    </div>
                    <div className="mt-5 p-7">
                    <div className="block  text-gray-700 pb-5 font-bold text-base" htmlFor="trainerName">Trainer Name:   <span className="font-normal ml-3 text-gray-500" >{formData?.trainerName}</span> </div>
                    <div className="block  text-gray-700 pb-5 font-bold text-base" htmlFor="trainerName">Slot:   <span className="font-normal ml-3 text-gray-500" >{formData?.selectedSlot}</span> </div>
                    <div className="block  text-gray-700 pb-5 font-bold text-base" htmlFor="trainerName">Package name::   <span className="font-normal ml-3 text-gray-500" >{formData?.package}</span> </div>
                    <div className="block  text-gray-700 pb-5 font-bold text-base" htmlFor="trainerName">Price:   <span className="font-normal ml-3 text-gray-500" >{price}</span> </div>
                    <div className="block  text-gray-700 pb-5 font-bold text-base" htmlFor="trainerName">SelecteClass:   <span className="font-normal ml-3 text-gray-500" >{formData?.selectedClass}</span> </div>
                    </div>
                </div>
                <div>

                </div>

                {/* <button type="submit" className="block w-full bg-[#1E1743] text-white font-bold py-2 px-4 rounded mt-4">
                        Confirm Booking
                    </button> */}


            </div>


        </div>
    );
};

export default PaymentPage;