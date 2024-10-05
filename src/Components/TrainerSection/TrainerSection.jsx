
import Trainer from "./Trainer";
import useTrainers from "../../Hook/useTrainers";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";


const TrainerSection = () => {
    const { data, isLoading, error, refetch } =useTrainers() 
    return (
        <div className="mb-20">
        <div>
            <div className="text-center">
                <h1 className="text-4xl font-Prata font-bold mt-24" >Trainer</h1>
                <p className="mt-2 mb-10 text-slate-500 ">Benefit from custom weight loss plans integrating exercise, diet, and ongoing support, guiding you <br /> towards safe and sustainable weight management.</p>
            </div>
            <div className="lg:grid gap-3 grid-cols-3 container mx-auto ">
                {
                    data?.slice(0,3).map(trainer=> <Trainer key={trainer._id} trainer={trainer}></Trainer>)
                }
            </div>
            
        </div>
        <div className="float-end w-60 mt-3 container mx-auto ">
                <Link to={`/trainers`} ><button className="mx-auto border border-[#084711] w-44 btn px-5  hover:bg-[#605985] text-[#1E1743] font-Montserrat text-base">See More <FaArrowRight /></button></Link>
            </div>
        </div>
    );
};

export default TrainerSection;