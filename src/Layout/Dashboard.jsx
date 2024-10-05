import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import DeshboardHeader from "../Components/DeshboardHeader/DeshboardHeader";
import UseAuth from "../Hook/useAuth";


const Dashboard = () => {
    const { loading } = UseAuth();
    if (loading) {

        return <div className="bg-[#1E1743] h-screen flex justify-center items-center">
            <div>
                <span className=" text-white m-auto loading loading-spinner w-20"></span>
                <div className="flex items-center justify-center  -ml-[30%]">

                    <h1 className="mt-5 mr-10 tracking-widest text-[#FFFFFF] font-Prata font text-5xl">PAVILION FITFOCUS</h1>
                </div>
            </div>


        </div>
    }
    return (
        <>
        <DeshboardHeader></DeshboardHeader>
        <div className="grid grid-cols-5 justify-center items-start">
            <div className="col-span-1 "><Sidebar></Sidebar></div>
            <div className="col-span-4">
                <Outlet></Outlet>
            </div>
        </div>
        </>
    );
};

export default Dashboard;