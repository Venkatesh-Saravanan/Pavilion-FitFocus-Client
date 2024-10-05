import React, { useState } from 'react';
import usePendingData from "../../../Hook/usePendingData";
import useRejectedData from "../../../Hook/useRejectedData";
import { FaEye } from 'react-icons/fa';

const ActivityLogpage = () => {
    const { pendingData, pendingDataLoading } = usePendingData();
    const { rejectedData, rejectedDataLoading } = useRejectedData();
    const [selectedItem, setSelectedItem] = useState(null);

    let combinedData = [];

    if (pendingData && rejectedData) {
        combinedData = [...pendingData, ...rejectedData];
    }

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        document.getElementById('my_modal_5').showModal();
    };

    return (
        <div className="flex w-[70%] mx-auto mt-2 text-xl font-Rilway mb-10">
            
            <div className="overflow-x-auto">
            <div className='font-bold text-3xl text-center text-[#2F7955] p-5'>
                <h1>Activity Log page</h1>
            </div>
                <table className="table">
                    
                    {/* head */}
                    <thead className="bg-[#2F797A] text-white">
                        <tr>
                            <th className='px-15 text-xl border border-black'>Name</th>
                            <th className='px-15 text-xl border border-black'>Status</th>
                            <th className='px-15 text-xl border border-black'>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {combinedData.map((item, index) => (
                            <tr className='' key={index}>
                                <td className='border text-xl border-black'>{item.name}</td>
                                <td className='border text-xl border-black px-10'>{item.status}</td>
                                <td onClick={() => handleOpenModal(item)} className='border text-center cursor-pointer text-xl border-black px-10'>
                                    {item.status === "rejected" ? <FaEye /> : 'No feedback available'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Feedback</h3>
                    <p className="py-4">{selectedItem && selectedItem.FeedBack}</p>
                    <div className="modal-action">
                        <button onClick={() => document.getElementById('my_modal_5').close()} className="btn">Close</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ActivityLogpage;