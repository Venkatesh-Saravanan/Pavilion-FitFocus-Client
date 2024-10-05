import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Hook/useAxiosSecure";
import { Link } from "react-router-dom";
import useAxiosSecurePrivate from "../../Hook/useAxiosSecurePrivate";


const AvailableSlots = ({ slot, id,email }) => {
   
    const axiosSecurePrivte = useAxiosSecurePrivate()

  
    const { data: bookingData, isLoading: bookedIsLoading, error: bookedError } = useQuery({
        queryKey: ['singleslot', slot],
        queryFn: async () => {
            try {
                const res = await axiosSecurePrivte.get(`/ckeckbooking/${email}/${slot}`);
                return res.data;
            } catch (error) {
                throw new Error("Failed to fetch slot data");
            }
        }
    });
    if (bookedIsLoading) return <div>Loading booked slots...</div>;
    if (bookedError) return <div>Error: {bookedError.message}</div>;
   
    const isSlotBooked = Array.isArray(bookingData) && bookingData.map(item => item.selectedSlot).includes(slot);

    return (
        <div>
            {isSlotBooked ? (
                <div className="bg-slate-950 ml-3 text-white text-center p-5 mb-2 rounded-lg relative">
                    <h2 className=" p-1 px-1   text-white bg-green-500 absolute -top-0 -left-0">Booked</h2>
                    <h2 className="text-2xl font-semibold">{slot}</h2>
                    <h1>Booked By:</h1>
                    <span className="text-sm text-center text-gray-400 dark:text-gray-600">
                        {bookingData?.map(d => d.name).join(", ")} <br />
                        {bookingData?.map(d => d.email).join(", ")}
                    </span>
                </div>
            ) : (
                <div className="relative ml-3 mb-2 p-2 rounded-xl bg-slate-950 text-white  ">
                    <h2 className="p-1 px-1   text-white bg-red-500 absolute -top-0 -left-0">Available</h2>
                    <div className="text-center text-2xl font-semibold p-5 mb-2 rounded-lg">{slot}</div>
                    <Link className="flex items-center justify-center"  to={`/trainers/${id}/${slot}`}>
                        <button className="px-8 py-3 text-lg font-semibold rounded bg-[#2F7955] text-gray-50 dark:text-gray-900 mx-auto">Booking</button>
                    </Link>
                </div>

            )}
        </div>
    );
};

export default AvailableSlots;