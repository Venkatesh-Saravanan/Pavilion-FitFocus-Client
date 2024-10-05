import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import UseAuth from "../../Hook/useAuth";
import Footer from "../../Components/Footer/Footer";


const Root = () => {
    const { loading } = UseAuth();
    if (loading) {
// set loading
        return <div className="bg-[#1E1743] h-screen flex justify-center items-center">
     
            <div className="mx-auto text-center">
                <span className="w-20 text-white  loading loading-spinner "></span>
                <h1 className="mt-5 mr-10 tracking-widest text-[#FFFFFF] font-Prata font text-5xl">PAVILION FITFOCUS</h1>

            </div>


        </div>
    }
    return (
        <div className="w-full" >
            <Header className="w-full "></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;