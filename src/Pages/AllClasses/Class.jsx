import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Hook/useAxiosSecure";
import { Link } from "react-router-dom";

const Class = ({ Class,dataLength }) => {
  

    const { data: trainers, isLoading, error } = useQuery({
        queryKey: ['Allclass', Class.className],
        queryFn: async () => {
            const res = await axiosSecure(`/trainers/classes/${Class.className}`);
            return res.data;
        }
    });

   
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    

    return (
        <div className="bg-white border border-[#c4d6db] shadow-lg rounded-xl mx-5">
            <div className="grid gap-5 grid-cols-3 items-center justify-center">
                <div className="col-span-1">
                    <img height={300} width={200} className="rounded-xl p-1" src={Class.image} alt={Class.className} />
                </div>
                <div className="col-span-2 py-5">
                    <div>
                        <h1 className="font-Rilway font-bold text-2xl pb-3">{Class.className}</h1>
                        <span className="font-normal text-base text-slate-500">{Class.details}</span>
                    </div>
                    <div className="mt-3 text-center pb-5">
                <h1 className="font-semibold text-xl pb-2 font-Rilway">Trainer/Coach Who Took This Class</h1>
                {trainers?.slice(0,5).map(trainer => (
                    <div key={trainer._id} className="inline-block mx-2">
                        <Link to={`/trainers/${trainer._id}`}>
                       <img alt="" className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100" src={trainer.photoURL}/>
                       </Link>
                    </div>
                ))}
            </div>
                </div>
            </div>
            
        </div>
    );
};

export default Class;