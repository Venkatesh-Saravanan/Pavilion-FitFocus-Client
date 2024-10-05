import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../../../Hook/useAxiosSecure';
import { MdPreview } from 'react-icons/md';

const Classes = ({ classItem }) => {
    const [showFullDetails, setShowFullDetails] = useState(false);

    const toggleDetails = () => {
        setShowFullDetails(!showFullDetails);
    };

    const { data: classItemData, isLoading: classItemLoading, error: classItemError } = useQuery({
        queryKey: ['class', classItem],
        queryFn: async () => {
            const res = await axiosSecure.get(`/NewClass/${classItem}`);
            return res.data;
        },
    });

    if (classItemLoading) {
        return <div>Loading ...</div>;
    }

    console.log(classItemData);

    
    const details = classItemData?.details || '';

    return (
        <div className="w-[80%] mx-auto mb-5 p-5  font-Rilway  rounded-md shadow-md bg-slate-100 dark:bg-gray-50 dark:text-gray-800 border border-[#e6e5eb]">
            <div className="flex justify-between">
                <div className="flex items-center just gap-5">
                    <img
                        width={50}
                        height={50}
                        src={classItemData?.image}
                        alt=""
                        className="rounded-full dark:bg-gray-500"
                    />
                    <h2 className="text-lg font-semibold tracking-wide">{classItemData?.className}</h2>
                </div>
                <div className="flex mr-0 item-center font-bold">
                    <MdPreview size={25} />
                    <p>{classItemData?.totalBook}</p>
                </div>
            </div>
            <div className="flex gap-5 justify-evenly">
                <div>
                    <p className="dark:text-gray-800 text-sm">
                        {showFullDetails ? details : details.slice(0, 100)}
                        {details.length > 100 && (
                            <span
                                className="text-[#1882FF] font-bold text-lg ml-2 cursor-pointer"
                                onClick={toggleDetails}
                            >
                                {showFullDetails ? 'see less' : 'see more'}
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Classes;