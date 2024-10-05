import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";



const Layout = () => {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-5 h-full  ">
                <div className="col-span-1">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-span-4">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Layout;