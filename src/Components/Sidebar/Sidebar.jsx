
import { FaHome, FaUserFriends } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { SiTrainerroad } from "react-icons/si";

import { Link, NavLink, Navigate } from "react-router-dom";
import UseAuth from "../../Hook/useAuth";
import { useEffect, useState } from "react";
import useUserByEmail from "../../Hook/useUserByEmail";


const Sidebar = () => {
    const { user,logOut } = UseAuth()
    const [userData, setUserData] = useState(null);
    const { data, isLoading, error, refetch } = useUserByEmail();

    useEffect(() => {
        if (data) {
            setUserData(data);
        } else {
            setUserData(null);
        }
    }, [data]);
    return (
        <div>
            <div className="bg-fixed ">

            </div>
            <div className=" h-[650px] col-span-1 shadow-2xl border-r-2 border-black bg-[#1E1743]">
                <div className="h-full text-[#fff]  p-3 space-y-2 w-60 dark:bg-gray-50 dark:text-gray-800">
                    <div className="flex items-center p-2 space-x-4">
                        <img src={user?.photoURL} alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
                        <div>
                            <h2 className="text-lg font-semibold">{user?.displayName}</h2>
                            <span className="flex items-center space-x-1">
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">View profile</a>
                            </span>
                        </div>
                    </div>







                    <div className="divide-y dark:divide-gray-300">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                        <li className="">
                                        <NavLink to="/deshboard">
                                            <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                <FaUserFriends />
                                                <span>DeshBoard</span>
                                            </a>
                                        </NavLink>
                                    </li>
                            {
                                userData?.role === "admin" && (
                                    <>
                                    <li className="">
                                        <NavLink to="/deshboard/Balance">
                                            <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                <FaUserFriends />
                                                <span>Balance</span>
                                            </a>
                                        </NavLink>
                                    </li>


                                    <li>
                                <NavLink to="/deshboard/newslatter">
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <FaEnvelope></FaEnvelope>
                                        <span>Newsletter subscribers</span>
                                    </a>
                                </NavLink>
                            </li>


                            <li>
                                <NavLink to="/deshboard/trainers">
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <SiTrainerroad />
                                        <span>Trainer</span>
                                    </a>
                                </NavLink >
                            </li>

                            <li className="">
                                <NavLink to="/deshboard/appliedTrainer">
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <FaUserFriends />
                                        <span>Applied Trainers</span>
                                    </a>
                                </NavLink>
                            </li>

                            
                            <li>
                                <NavLink to="/deshboard/addnewclass">
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <IoAddCircle />
                                        <span>Add New Class</span>
                                    </a>
                                </NavLink>
                            </li>
                                    
                                    </>

                                )
                            }





                           {
                            userData?.role === "trainer" && (
                                <>
                                     <li>
                                <NavLink to="/deshboard/addslot">
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <IoAddCircle />
                                        <span>Add New Slot</span>
                                    </a>
                                </NavLink >
                            </li>






                            <li>
                                <NavLink to="/deshboard/manageslot">
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <IoAddCircle />
                                        <span>Manage Slot</span>
                                    </a>
                                </NavLink>
                            </li>


                                
                                </>
                            )
                           }


                           


                           

                            <li>
                                <NavLink to="/deshboard/AddForumPost">
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                        <IoAddCircle />
                                        <span>Add Forum Post</span>
                                    </a>
                                </NavLink>
                            </li>


                        </ul>
                        <ul className="pt-4 pb-2 space-y-1 text-sm">
                            <NavLink to="/">
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <FaHome></FaHome>
                                    <span>Go Back Home</span>
                                </a>
                            </li>
                            </NavLink>
                           
                            
                        </ul>
                    </div>
                </div>

            </div>


        </div>

    );
};

export default Sidebar;