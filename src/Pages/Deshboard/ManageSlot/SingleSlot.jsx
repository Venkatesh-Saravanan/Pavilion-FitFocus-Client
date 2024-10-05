import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../Hook/useAxiosSecure";
import { FaTrash } from "react-icons/fa"; // Fixed icon import
import UseAuth from "../../../Hook/useAuth";
import Swal from "sweetalert2";
import useAxiosSecurePrivate from "../../../Hook/useAxiosSecurePrivate";

const SingleSlot = ({ slot, trainerid, refetch }) => {
    const axiosSecurePrivte = useAxiosSecurePrivate()
    const { user } = UseAuth()

    const { data, isLoading, error } = useQuery({
        queryKey: ['singleslot', slot],
        queryFn: async () => {
            try {
                const res = await axiosSecurePrivte.get(`/ckeckbooking/${user.email}/${slot}`);
                return res.data;
            } catch (error) {
                throw new Error("Failed to fetch slot data");
            }
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

  

    
    const handleDelete = async (id, slot) => {
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
                axiosSecure.delete(`/trainers/${trainerid}/${slot}`)
                    .then(res => {
                        if (res) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }

                    })

            }
        });
      




    };


    const isSlotBooked = Array.isArray(data) && data.map(item => item.selectedSlot).includes(slot);

    return (
        <div>
            {isSlotBooked ? (
                <div className="bg-slate-950 mr-3 h-36 text-white text-center p-5 mb-2 rounded-lg relative">
                    <h2 className=" p-1 px-1   text-white bg-red-500 absolute -top-0 -left-0">Booked</h2>
                    <div className="grid grid-cols-3 items-center justify-between">
                        <div className="col-span-2">
                            <h2 className="text-2xl font-semibold">{slot}</h2>
                            <h1>Booked By:</h1>
                            <span className="text-sm text-center text-gray-400 dark:text-gray-600">
                                {data?.map(d => d.name).join(", ")} <br />
                                {data?.map(d => d.email).join(", ")}
                            </span>
                        </div>
                        <div>
                            
                            <button onClick={() => handleDelete(trainerid, slot)} className="btn text-red-500"><FaTrash size={16} /></button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative mr-3 h-36 bg-slate-950 rounded-lg  mb-3 ">
                    <h2 className="p-1 px-1   text-white bg-red-500 absolute -top-0 -left-0">Available</h2>
                    <div className="grid grid-cols-4 items-center gap-3justify-between">
                        <div className="col-span-3 text-center text-white">
                            <div className="  text-2xl font-semibold text-center p-5 mb-2 rounded-lg">{slot}</div>
                            <h1> an open canvas of possibilities!</h1>
                        </div>


                        <div className="col-span-1">
                          
                            <button onClick={() => handleDelete(trainerid, slot)} className="btn col-span-1 text-red-500"><FaTrash size={16} /></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleSlot;