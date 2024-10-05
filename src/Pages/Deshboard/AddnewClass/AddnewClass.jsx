import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { axiosSecure } from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';


function AddnewClass() {
  
  const { register, setValue, handleSubmit,reset, formState: { errors } } = useForm();
  useEffect(() => {
    
        setValue('totalBook', 0 );
      
    
}, [ setValue]);
  const onSubmit = (data) => {
   
    axiosSecure.post('/NewClass',data)
    .then(response=>{
      
        const responseData = response.data;
        if (responseData.error) {
           
            Swal.fire({
                title: 'Error!',
                text: responseData.error,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
          
        } else {
            // If successful, show success message
            Swal.fire({
                title: 'Success!',
                text: 'Added successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });

        }
       
    })
   
  };
  
  return (
    <div className="lg:w-[60%] shadow-lg mx-auto mt-10 p-5 bg-slate-100  border border-blue-300">
      <h1 className='text-2xl font-Prata font-bold text-center p-5'>Add New Class</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Class Name</span>
          </label>
          <input
            type="text"
            placeholder="Class Name"
            className="input input-bordered"
            {...register('className', { required: true })}
          />
          {errors.className && (
            <p className="text-red-500 ml-1">Class Name is required.</p>
          )}
        </div>
        
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input
            type="text"
            placeholder="Image URL"
            className="input input-bordered"
            {...register('image', { required: true })}
          />
          {errors.image && (
            <p className="text-red-500 ml-1">Image URL is required.</p>
          )}
        </div>


        <input
        disabled
            type="number"
            placeholder="Image URL"
            className="input hidden input-bordered"
            {...register('totalBook', { required: true })}
          />


        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Details</span>
          </label>
          <textarea
            placeholder="Details"
            className="input input-bordered h-32"
            {...register('details', { required: true })}
          ></textarea>
          {errors.details && (
            <p className="text-red-500 ml-1">Details are required.</p>
          )}
        </div>
        <div className='flex items-center'>
        <button type="submit" className="btn mx-auto w-36 bg-[#1E1743] text-white mt-4">ADD</button>
        </div>
        
      </form>
    </div>
  );
}

export default AddnewClass;