import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { axiosSecure } from "../../Hook/useAxiosSecure";
import AvailableSlots from "./AvailableSlots";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import useAxiosSecurePrivate from "../../Hook/useAxiosSecurePrivate";

const TrainerDetailsPage = () => {
    const { id } = useParams();
   
    const axiosSecurePrivte = useAxiosSecurePrivate()
   

    const { data: trainer, isLoading, error } = useQuery({
        queryKey: ['TrainerDetails', id],
        queryFn: async () => {
            const res = await axiosSecurePrivte.get(`/trainers/${id}`);
            return res.data;
        }
    });

   

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    

   

    return (
        <>
            <section className="py-6 container mx-auto bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 shadow-xl">
                <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
                    <h1 className="text-5xl font-bold leading-none text-center font-Prata">Be A Trainer</h1>
                    <p className="text-xl font-medium text-center">At Pavilion FitFocus, we pride ourselves on having an elite team of dedicated trainers who are passionate about helping you achieve your fitness goals. </p>
                    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
                        <Link to={"/beATrainer"}>
                            <button className="px-8 py-3 text-lg font-semibold rounded bg-[#1E1743]  text-gray-50 dark:text-gray-900">Be A Trainer</button>
                        </Link>
                    </div>
                </div>
            </section>
            <div className="grid grid-cols-3 justify-center container mb-20 mx-auto mt-3">
                <div className="border border-black col-span-1 ">
                    <h1 className="text-center border-b border-black p-3 font-Rilway font-bold text-xl">Trainer info</h1>
                    <div className="">
                        <img src={trainer?.photoURL} alt="" className="w-32 h-32 mx-auto rounded-full bg-gray-500 dark:bg-gray-500 aspect-square" />
                        <div className="space-y-4 text-center divide-y divide-gray-700 dark:divide-gray-300">
                            <div className="my-2 space-y-1">
                                <h2 className="text-xl font-semibold sm:text-2xl">{trainer?.name}</h2>
                                <p className="px-5 text-xs sm:text-base text-gray-400 dark:text-gray-600"> {trainer?.skills?.join(', ')}</p>
                            </div>
                            <div className="flex justify-center items-center  pt-3 space-x-4 align-center">
                                {/* Social Media Links */}
                               <FaFacebook size={20}></FaFacebook>
                               <FaInstagram size={20}></FaInstagram>
                               <FaLinkedin size={20}></FaLinkedin>
                            </div>
                            <div className="border-b-2"></div>
                        </div>
                        <div className="text-lg font-Rilway text-center text-gray-600 font-bold">
                            <div>Age: {trainer?.age}</div>
                            <span className="">Available time: {trainer?.availableTime}</span> <br />
                            <span className="">Available Day: {trainer?.AvailableDaysAWeek?.map(day => day.label).join(', ')}</span> <br />
                            <span className="">Other Info: <span className="text-xm font-normal">{trainer?.otherInfo}</span></span> <br />
                        </div>
                    </div>
                </div>
                <div className="border border-black col-span-2">
                    <h1 className="border-b border-black text-center p-3 font-Rilway font-bold text-xl">Available slots</h1>
                    <div className="grid grid-cols-2 p-5">
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
        </>
    );
};

export default TrainerDetailsPage;