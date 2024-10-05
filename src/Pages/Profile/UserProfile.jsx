import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../Hook/useAuth';
import auth from "../../Firebase/Firebase.config";
import useUserByEmail from '../../Hook/useUserByEmail';
import { axiosSecure } from '../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

function UserProfile() {
    const { data,refetch } = useUserByEmail()
    const { register, setValue, handleSubmit, errors } = useForm();
    const { user } = UseAuth();
    const [lastSignInDate, setLastSignInDate] = useState(null);
    useEffect(() => {
        const fetchLastSignInDate = async () => {
          if (user) {
            try {
              const currentUser = await auth.currentUser;
              if (currentUser) {
                const lastSignIn = currentUser.metadata.lastSignInTime;
                setLastSignInDate(lastSignIn ? lastSignIn.toString() : 'Not available');
              }
            } catch (error) {
              console.error('Error fetching last sign in date:', error);
            }
          }
        };
    
        fetchLastSignInDate();
      }, [user]);
    
      useEffect(() => {
        if (data) {
          setValue('name', data?.name);
          setValue('photoURL', data?.photoURL);
          setValue('email', data?.email);
        }
      }, [data, setValue]);
    
      const onSubmit = async (formData) => {
        formData = { ...formData, lastSignInDate };
    
        try {
          const response = await axiosSecure.put(`/user/${data.email}`, formData);
    
          if (response.status === 200) {
           
            Swal.fire("User Profile updated successfully");
            refetch();
          } else {
            console.error('Error updating profile:', response.statusText);
           
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          
        }
      };
    
      useEffect(() => {
        if (data && user) {
          refetch();
        }
      }, [data, user, refetch]); 
    

    return (
        <div className='shadow-xl border border-blue-300 mb-10 pb-5 mx-auto lg:w-[60%]'>
        <div className='mt-24'>
            <img width={200} height={200} className='rounded-full mx-auto' src={data?.photoURL} alt="" />
        </div>
        <form className='mx-auto w-[60%]' onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control ">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    {...register("name", { required: true })}
                />
                {errors && errors.name && (
                    <p className="text-red-500 ml-1">Name is required.</p>
                )}
            </div>
            <div className="form-control ">
                <label className="label">
                    <span className="label-text">PhotoURL</span>
                </label>
                <input
                    type="text"
                    placeholder="photo URL"
                    className="input input-bordered"
                    {...register("photoURL", { required: true })}
                />
                {errors && errors.PhotoURL && (
                    <p className="text-red-500 ml-1">PhotoURL is required.</p>
                )}
            </div>

            
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input disabled
                    type="email"
                    placeholder="Email"
                    className="input input-bordered"
                    {...register("email", { required: true })}
                />
                {errors && errors.email && (
                    <p className="text-red-500 ml-1">Email is required.</p>
                )}
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Last login status</span>
                </label>
                <input disabled
                    type="text"
                    value={lastSignInDate}
                    readOnly
                    className="input input-bordered"
                />
            </div>

           
<div className='text-center '>
<button type="submit" className="btn px-5 text-center text-white bg-[#1E1743] mt-4">Edit</button>
</div>
         
        </form>
        </div>
    );
}

export default UserProfile;