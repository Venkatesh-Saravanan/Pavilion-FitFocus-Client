
import Trainer from "./Trainer";
import useTrainers from "../../Hook/useTrainers";


const AllTrainer = () => {
    const { data, isLoading, error, refetch } =useTrainers()

    if (isLoading) {
        return <div className="bg-red-500 text-3xl text-center">Loading.....</div>
    }
    
    return (
        <div>
            
            <div className="lg:grid grid-cols-3 container mx-auto">
                {
                    data?.map(trainer=> <Trainer key={trainer._id} trainer={trainer}></Trainer>)
                }
            </div>
        </div>
    );
};

export default AllTrainer;