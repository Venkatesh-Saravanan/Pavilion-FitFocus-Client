import { useQuery } from "@tanstack/react-query";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { axiosSecure } from "../../../Hook/useAxiosSecure";
import UseAuth from "../../../Hook/useAuth";
import AvailableSlots from "./AvailableSlots";
import Classes from "./Classes";
import useAxiosSecurePrivate from "../../../Hook/useAxiosSecurePrivate";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const TrainerInfo = ({ bookedTrainer }) => {
    const { user } = UseAuth();
    
    const axiosSecurePrivte = useAxiosSecurePrivate()
    const { data: trainer, isLoading, error,reset } = useQuery({
        queryKey: ['BookedTrainerDetails', bookedTrainer],
        queryFn: async () => {
            const res = await axiosSecurePrivte.get(`/alltrainer/${bookedTrainer}`);
            return res.data;
        }
    });

   
    const { register, handleSubmit } = useForm();
const axiosSecurePrivate = useAxiosSecurePrivate()
    const onSubmit = (formData) => {
      
        axiosSecurePrivate.post('/review',formData).then(res=>{
            if(res){
                Swal.fire("Review added succefully!");
                reset()
            }
           
        })
    };
    return (

        <>
            <div className="flex justify-evenly ">
                <div className="grid grid-cols-3 justify-center container mb-20 mx-auto mt-3">
                    <div className="border border-black col-span-1">
                        <h1 className="text-center border-b border-black p-3 font-Rilway font-bold text-xl">Trainer info</h1>
                        <div className="">
                            <img src={trainer?.photoURL} alt="" className="w-32 h-32 mx-auto rounded-full bg-gray-500 dark:bg-gray-500 aspect-square" />
                            <div className="space-y-4 text-center divide-y divide-gray-700 dark:divide-gray-300">
                                <div className="my-2 space-y-1">
                                    <h2 className="text-xl font-semibold sm:text-2xl">{trainer?.name}</h2>
                                    <p className="px-5 text-xs sm:text-base text-gray-400 dark:text-gray-600">{trainer?.skills?.join(', ')}</p>
                                </div>
                                <div className="flex justify-center items-center pt-3 space-x-4 align-center">
                                    <FaFacebook size={20} />
                                    <FaInstagram size={20} />
                                    <FaLinkedin size={20} />
                                </div>
                                <div className="border-b-2"></div>
                            </div>
                            <div className="text-lg font-Rilway text-center text-gray-600 font-bold">
                                <div>Age: {trainer?.age}</div>
                                <span>Available time: {trainer?.availableTime}</span> <br />
                                <span>Available Day: {trainer?.AvailableDaysAWeek?.map(day => day.label).join(', ')}</span> <br />

                            </div>
                        </div>
                    </div>

                    <div className="border border-black col-span-2">
                        <h1 className="border-b border-black text-center p-3 font-Rilway font-bold text-xl">classes the trainer offers </h1>
                        {trainer?.classes ? (
                            trainer?.classes.map(classItem => (
                                <Classes key={classItem.value} classItem={classItem.value} />
                            ))
                        ) : (
                            <div>No classes available</div>
                        )}

                    </div>





                </div>

                <div>
                    <div className="border h-[94%] border-black col-span-2 mt-3">
                        <h1 className="border-b border-black text-center p-3 font-Rilway font-bold text-xl">Available slots</h1>
                        <div className="p-5 h-full ">
                            {trainer?.SlotTime ? (
                                trainer.SlotTime.map(slot => (
                                    <AvailableSlots key={slot} id={trainer._id} email={trainer.user_email} slot={slot} />
                                ))
                            ) : (
                                <div>No slots available</div>
                            )}
                        </div>

                    </div>

                </div>

            </div>
            <div onClick={() => document.getElementById('my_modal_5').showModal()} className=" flex justify-center items-center -mt-20 ">
                <button className="btn bg-[#1E1743] text-white font-bold px-5 py-2">Review</button>
            </div>






            {/* Open the modal using document.getElementById('ID').showModal() method */}
            
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4 hidden">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                    id="name"
                    type="text"
                    value={user.displayName}
                    {...register("name", { required: true })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your name"
                />
            </div>
            <div className="mb-4 hidden">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                <input
                    id="name"
                    type="text"
                    value={user.photoURL}
                    {...register("image", { required: true })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your name"
                />
            </div>
           
            <div className="mb-4">
                <label htmlFor="review" className="block text-gray-700 text-sm font-bold mb-2">Review</label>
                <textarea
                    id="review"
                    {...register("review", { required: true })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="5"
                    placeholder="Enter your review"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
                <select
                    id="rating"
                    {...register("rating", { required: true })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Select rating</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                </select>
            </div>
            <div className="flex items-center justify-between">
                <button type="submit" className="bg-[#1E1743] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit
                </button>
            </div>
        </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default TrainerInfo;