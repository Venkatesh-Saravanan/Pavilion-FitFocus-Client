import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye } from "react-icons/fa6";
import Swal from 'sweetalert2';
import useAxiosSecurePrivate from '../../Hook/useAxiosSecurePrivate';

const SingleTrainers = ({ data, isLoading, refetch }) => {
    const axiosSecurePrivate = useAxiosSecurePrivate();
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [rejectFeedback, setRejectFeedback] = useState('');
    const { register, setValue, handleSubmit, reset } = useForm();

    if (isLoading || !data) {
        return <div>Loading...</div>;
    }

    const handleButtonClick = async (id) => {
        const response = await axiosSecurePrivate.get(`/trainers/${id}`);
        setSelectedTrainer(response.data);
        setModalOpen(true);
        populateFormFields(response.data); 
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedTrainer(null);
        reset();
    };

    const openRejectModal = () => {
        setRejectModalOpen(true);
        setValue('status', 'rejected');
    };

    const closeRejectModal = () => {
        setRejectModalOpen(false);
        setRejectFeedback('');
        reset();
    };

    const onSubmit = async (formData) => {
        formData = { ...formData, AvailableDaysAWeek: data.AvailableDaysAWeek };
        try {
            await axiosSecurePrivate.put(`/users/${formData.email}`,{role:'trainer'}, {
               
            });
            await axiosSecurePrivate.put(`/trainers/${data._id}`, {...formData, status: 'trainer'}, {
                headers: { "Content-Type": 'application/json' }
            });

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Trainer updated successfully',
                confirmButtonText: 'OK'
            });

            closeModal();
            refetch();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while updating the trainer. Please try again later.',
                confirmButtonText: 'OK'
            });
        }
    };



    // For rejection
    const onSubmitReject = async (rejectFormData) => {
        rejectFormData = { ...rejectFormData, AvailableDaysAWeek: data.AvailableDaysAWeek, };
      
        try {
          await axiosSecurePrivate.put(`/trainers/${data._id}`, rejectFormData);

            Swal.fire({
                icon: 'info',
                title: 'Success!',
                text: 'Trainer rejected successfully',
                confirmButtonText: 'OK'
            });

            closeRejectModal();
            refetch();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while rejecting the trainer. Please try again later.',
                confirmButtonText: 'OK'
            });
        }
    };

 
    const populateFormFields = (trainerData) => {
        setValue('name', trainerData.name || '');
        setValue('age', trainerData.age || '');
        setValue('email', trainerData.user_email || '');
        setValue('skills', trainerData.skills.join(', ') || '');
        setValue('availableTime', trainerData.availableTime || '');
        setValue('otherInfo', trainerData.otherInfo || '');
        setValue('experince', trainerData.Experience || 0);
    };

    return (
        <div>
            {/* Trainer Card */}
            <div className="max-w-md h-72 shadow-sm rounded-xl w-[100%] flex justify-center items-center p-8 sm:flex sm:space-x-6 bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-center items-center gap-5">
                        <img
                            alt=""
                            className="w-16 h-16 mx-auto rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100"
                            src={data.photoURL}
                        />
                        <div>
                            <h2 className="text-2xl disabled font-semibold">{data.name}</h2>
                        </div>
                    </div>
                    <hr className=" h-[1px] border-none bg-slate-300 mx-auto w-[100%]" />
                    <div className='grid grid-cols-3 justify-center gap-2'>
                        {data.skills.map((skill, index) => (
                            <span key={index} className="text-sm text-center text-gray-400 dark:text-gray-600">
                                {skill}
                            </span>
                        ))}
                    </div>
                    <hr className="-ml-0 h-[1px] border-none bg-slate-300 mx-auto w-[100%]" />
                    <div onClick={() => handleButtonClick(data._id)} className="flex cursor-pointer bg-transparent items-center justify-center">
                        <FaEye />
                    </div>
                    <hr className="-ml-0 h-[1px] border-none bg-slate-300 mx-auto w-[100%]" />
                </div>
            </div>

            {/* Accept Modal */}
            {modalOpen && (
                <dialog id={`my_modal_${selectedTrainer?._id}`} className="modal modal-bottom sm:modal-middle" open>
                    <div className="modal-box">
                        {selectedTrainer ? (
                            <div className='p-5'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-4 h-28 w-28">
                                        <img src={data.photoURL} alt="" />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            disabled
                                            className="mt-1 text-2xl font-bold block w-full"
                                            {...register("name")}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Skills :</label>
                                        <input
                                            disabled
                                            className="mt-1 block w-full"
                                            {...register("skills")}
                                        />
                                    </div>
                                    <div className="mb-4 flex items-center">
                                        <label className="block text-sm font-medium text-gray-700">Age</label>
                                        <input
                                            disabled
                                            type="number"
                                            className="mt-1 block w-full border-none"
                                            {...register("age")}
                                        />
                                    </div>
                                    <div className="mb-4 flex items-center">
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            disabled
                                            type="text"
                                            className="mt-1 block w-full border-none"
                                            {...register("email")}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Available Days</label>
                                        {data.AvailableDaysAWeek.map((day, index) => (
                                            <div key={index} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    value={day.value}
                                                />
                                                <label className="ml-2">{day.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Available Time</label>
                                        <input
                                            disabled
                                            className="mt-1 block w-full"
                                            {...register("availableTime")}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
                                        <input
                                            disabled
                                            className="mt-1 block w-full"
                                            {...register("experince")}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Other Info</label>
                                        <input
                                            disabled
                                            type='textarea'
                                            className="mt-1 block w-full"
                                            {...register("otherInfo")}
                                        />
                                    </div>
                                    <div className="modal-action">
                                        <button type="submit" className="btn bg-[#246955] text-white">Accept</button>
                                        <button type="button" className="btn bg-red-500 text-white" onClick={openRejectModal}>Reject</button>
                                        <button type="button" className="btn" onClick={closeModal}>Close</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </dialog>
            )}

            {/* Reject Modal */}
            {rejectModalOpen && selectedTrainer?._id && (
                <dialog id={`reject_modal_${selectedTrainer._id}`} className="modal modal-bottom sm:modal-middle" open>
                    <div className="modal-box">
                        {selectedTrainer ? (
                            <div className='p-5'>
                                <form onSubmit={handleSubmit(onSubmitReject)}>
                                    <div className="mb-4 h-28 w-28">
                                        <img src={data.photoURL} alt="" />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            disabled
                                            className="mt-1 text-2xl font-bold block w-full"
                                            {...register("name")}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Skills :</label>
                                        <input
                                            disabled
                                            className="mt-1 block w-full"
                                            {...register("skills")}
                                        />
                                    </div>
                                    <div className="mb-4 flex items-center">
                                        <label className="block text-sm font-medium text-gray-700">Age</label>
                                        <input
                                            disabled
                                            type="number"
                                            className="mt-1 block w-full border-none"
                                            {...register("age")}
                                        />
                                    </div>
                                    <div className="mb-4 flex items-center">
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            disabled
                                            type="text"
                                            className="mt-1 block w-full border-none"
                                            {...register("email")}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Available Days</label>
                                        {data.AvailableDaysAWeek.map((day, index) => (
                                            <div key={index} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    value={day.value}
                                                />
                                                <label className="ml-2">{day.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Available Time</label>
                                        <input
                                            disabled
                                            className="mt-1 block w-full"
                                            {...register("availableTime")}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Status</label>
                                        <input
                                            disabled
                                            className="mt-1 block w-full"
                                            {...register("status")}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
                                        <input
                                            disabled
                                            className="mt-1 block w-full"
                                            {...register("experince")}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Other Info</label>
                                        <input
                                            disabled
                                            type='textarea'
                                            className="mt-1 block w-full"
                                            {...register("otherInfo")}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Feedback</label>
                                        <textarea
                                            className="mt-1 block w-full border rounded-xl h-20 border-red-500"
                                           
                                            onChange={(e) => setRejectFeedback(e.target.value)}
                                            {...register("FeedBack")}
                                        />
                                    </div>
                                    <div className="modal-action">
                                        <button type="submit" className="btn bg-red-500 text-white">Reject</button>
                                        <button type="button" className="btn" onClick={closeRejectModal}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default SingleTrainers;