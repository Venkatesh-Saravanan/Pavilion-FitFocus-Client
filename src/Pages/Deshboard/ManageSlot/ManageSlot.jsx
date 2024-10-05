import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hook/useAuth";
import { axiosSecure } from "../../../Hook/useAxiosSecure";
import SingleSlot from "./SingleSlot";
import useAxiosSecurePrivate from "../../../Hook/useAxiosSecurePrivate";

const ManageSlot = () => {
    const axiosSecurePrivte = useAxiosSecurePrivate()
    const { user } = UseAuth();

    const { data: trainer, isLoading, error, refetch } = useQuery({
        queryKey: ['TrainerDetails'],
        queryFn: async () => {
            const res = await axiosSecurePrivte.get(`/alltrainer/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

  

    return (
        <div>
            <div className="border border-black col-span-2">
                <h1 className="border-b border-black text-center p-3 font-Rilway font-bold text-xl">Available slots</h1>
                <div className="grid grid-cols-2 p-5">
                    {trainer?.SlotTime ? (
                        trainer.SlotTime.map(slot => (
                            <SingleSlot key={slot} slot={slot} trainerid={trainer._id} refetch={refetch} />
                        ))
                    ) : (
                        <div>No slots available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageSlot;