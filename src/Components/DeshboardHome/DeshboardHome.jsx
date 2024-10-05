import React, { useEffect, useState } from "react";
import useClasses from "../../Hook/useClasses";
import useTrainers from "../../Hook/useTrainers";
import useCommunity from "../../Hook/useCommunity";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardHome = () => {
  const { classes } = useClasses();
  const { data: trainers } = useTrainers(); // Assuming useTrainers returns an object with data property
  const { posts } = useCommunity(); // Assuming useCommunity returns an object with posts property

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  // Example static data for the bar chart
  const chartData = [
    { name: 'Total Trainer', value: trainers?.length },
    { name: 'Total Post', value: posts?.length },
    { name: 'Total Classe', value: classes?.length }
  ];

  return (
    <div className="container mx-auto text-center mt-10">
      <div className="clock font-bold text-5xl text-[#1E1743]">
        {formattedTime}
      </div>
      <div className="grid grid-cols-3 gap-10 p-10">
        <div className="text-center shadow-xl bg-slate-100 p-10">
          <h1 className="text-xl font-bold">Total Trainer</h1>
          <p className="text-2xl">{trainers?.length}</p>
        </div>
        <div className="text-center shadow-xl bg-slate-100 p-10">
          <h1 className="text-xl font-bold">Total Community Post</h1>
          <p className="text-2xl">{posts?.length}</p>
        </div>
        <div className="text-center shadow-xl bg-slate-100 p-10">
          <h1 className="text-xl font-bold">Total Classes</h1>
          <p className="text-2xl">{classes?.length}</p>
        </div>
      </div>
      <div className="chart-container" style={{ backgroundColor: '#F3F4F6', padding: '20px' }}>
        <h2 className="text-2xl font-bold text-[#1E1743] mb-4 text-center">Compare about Trainer, posts, classes </h2>
        <div className="flex justify-center">
          <ResponsiveContainer width="50%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#1E1743" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;