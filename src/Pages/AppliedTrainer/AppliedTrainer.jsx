import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Hook/useAxiosSecure";
import { FaEye } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import UseAuth from "../../Hook/useAuth";
import { useEffect, useState } from "react";
import SingleTrainers from "./SingleTrainers";
import useTrainers from "../../Hook/useTrainers";
import useAxiosSecurePrivate from "../../Hook/useAxiosSecurePrivate";

const AppliedTrainer = () => {
  const axiosSecurePrivte = useAxiosSecurePrivate()
  const { data: datas, isLoading, error, refetch } = useQuery({
    queryKey: ['appliedTrainer'],
    queryFn: async () => {
      const res = await axiosSecurePrivte.get('/trainer/pending');
      return res.data;
    }
  });
  if (isLoading || !datas) {
    return <div>Loading...</div>;
}

  const { user } = UseAuth();

 

 

 
  return (
    <>
      <div className="text-center text-2xl font-bold font-Prata mt-10">Applied For Trainer</div>
      <div className="grid grid-cols-3 gap-2 w-[100%] p-3">
       {
        datas?.map(data=><SingleTrainers key={data._id} data={data} refetch={refetch} isLoading={isLoading}></SingleTrainers>)
       }
      </div>

      {/* Modal */}
      
      
    </>
  );
};

export default AppliedTrainer;