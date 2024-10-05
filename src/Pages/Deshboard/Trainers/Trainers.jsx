import Swal from "sweetalert2";
import useTrainers from "../../../Hook/useTrainers";
import { axiosSecure } from "../../../Hook/useAxiosSecure";
import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";

const Trainers = () => {
    const { data, isLoading, error, refetch } = useTrainers()
   

    const handleDlt = (_id, email) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(email)
             axiosSecure.put(`/users/${email}`,{role:'user'});
            axiosSecure.delete(`/trainers/${_id}`)
              .then(response => {
                if (response.data.deletedCount > 0) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your Food Item has been deleted.",
                    icon: "success",
                  });
                 refetch()
                  
                } else {
                  Swal.fire({
                    title: "Error!",
                    text: "No item was deleted. It might have already been removed.",
                    icon: "error",
                  });
                }
              })
              .catch(error => {
                console.error("Error occurred while deleting:", error);
                Swal.fire({
                  title: "Error!",
                  text: "Failed to delete your Food Item.",
                  icon: "error",
                });
              });
          }
        });
        };
        
    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold font-Prata py-5 pl-5">All Trainers: </h1>
            </div>
            <div>
                <table className="table w-[90%] mx-auto">
                    {/* head */}
                    <thead>
                        <tr className="bg-[#0C7EA0] text-white text-base text-center">
                            
                            <th className="border border-black">Name</th>
                            <th className="border border-black">Age</th>
                            <th className="border border-black">Skills</th>
                            <th className="border border-black">Available Time</th>
                            <th className="border border-black">Available Day</th>
                            <th className="border border-black">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map(trainer => <>
                                <tr>
                                    {
                                        console.log(trainer.AvailableDaysAWeek)
                                    }
                                    <td className="border border-black">{trainer.name}</td>
                                    <td className="border border-black">{trainer.age}</td>
                                    <td className="border m-2 border-black">
                                        {trainer.skills && trainer.skills.length > 0 ? (
                                            <ul>
                                                {trainer.skills.map((skill, index) => (
                                                    <li key={index}>{skill}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>No skills listed</span>
                                        )}
                                    </td>
                                    <td className="border border-black">{trainer.availableTime}</td>
                                    <td className="border m-2 border-black">
                                        {trainer.AvailableDaysAWeek && trainer.AvailableDaysAWeek.length > 0 ? (
                                            <ul>
                                                {trainer.AvailableDaysAWeek.map((day, index) => (
                                                    <li key={index}>{day.label}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>No available days listed</span>
                                        )}
                                    </td>
                                    <td className="border m-2 border-black  ">
                                        <button onClick={()=>{
                                            handleDlt(trainer._id,trainer.user_email)
                                        }} className="  btn text-red-500 "><FaDeleteLeft size={30}></FaDeleteLeft></button>
                                        
                                    </td>
                                </tr>
                            </>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Trainers;