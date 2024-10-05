import { FaCalendar, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react"; 


const Trainer = ({ trainer }) => {

  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <div>
        <div className="mt-10 h-[590px] font-Montserrat relative  border border-[#d5dadf] rounded-lg shadow-sm w-[95%]  mx-auto">
          <div className="">
            <div className='border-slate-100 bg-[#ffffff] border rounded-xl bg-[#F7F8F8]card card-compact  hover:bg-[#f3f5f3] mb-3 lg:m-0'>
              <figure>
                <img className="w-full h-64 rounded-t-2xl " src={trainer.photoURL} alt="Food image" />
              </figure>
              <div className="card-body mulish-font text-center rounded-lg">
                <div>
                  {trainer?.skills && trainer?.skills.length > 0 ? (
                    <span className="flex gap-2 items-center justify-center ">
                      <div className="bg-slate-200 p-1 text- font-bold">
                        {trainer.skills.join(', ')}
                      </div>
                    </span>
                  ) : (
                    <span>No skills listed</span>
                  )}
                </div>
                <hr className=' mt-1 h-[1px] border-none bg-slate-200 mx-auto w-[90%] ' />
                <h2 className="card-title">{trainer.name} <span className="text-base font-medium">({trainer.age} years)</span> </h2>
                <h2 className=" absolute top-0 left-0 bg-[#E70229] text-white p-2 rounded-2xl">Slot Available</h2>
                <div className="flex justify-between">
                  <h1>Experience : {trainer.Experience } years</h1>
                  <h1>Available Time: {trainer.availableTime}</h1>
                </div>
                <p className="text-[#B09696] mb-2 text-left">
                  {showMore ? trainer.otherInfo : trainer.otherInfo.slice(0, 150)}
                  <span className="text-[#1882FF] font-bold cursor-pointer ml-1" onClick={toggleShowMore}>
                    {showMore ? "See Less" : "See More"}
                  </span>
                </p>
                <div className='grid grid-cols-6 gap-0 text-base items-center justify-between text-left'>
                  
                 
                </div>
                <hr className=' mt-1 h-[1px] border-none bg-slate-200 mx-auto w-[100%] ' />
                <div className="flex items-center">
                  
                  <div className="flex w-full  justify-between items-center">
                  <div className="flex justify-center items-center  pt-3 space-x-4 align-center">
                                {/* Social Media Links */}
                               <FaFacebook size={20}></FaFacebook>
                               <FaInstagram size={20}></FaInstagram>
                               <FaLinkedin size={20}></FaLinkedin>
                            </div>
                    <div>
                      <Link to={`/trainers/${trainer._id}`} ><button className="btn px-5 bg-[#12132D] hover:bg-[#434577] text-[#fff]">Know More</button></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainer;