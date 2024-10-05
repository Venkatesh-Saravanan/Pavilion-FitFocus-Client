import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { axiosSecure } from "../../../Hook/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hook/useAuth";
import Select from 'react-select';
import useClasses from "../../../Hook/useClasses";
import useAxiosSecurePrivate from "../../../Hook/useAxiosSecurePrivate";

const AddNewSlot = () => {
    const axiosSecurePrivte = useAxiosSecurePrivate()
    const { user, loading: authLoading } = UseAuth();
    const [slotTimes, setSlotTimes] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
   const {classes, classesLoading} = useClasses()

    useEffect(() => {
        if (classes) {
            const newOptions = classes.map(cls => ({
                value: cls.className,
                label: cls.className
            }));
            setOptions(newOptions);
        }
    }, [classes]);

    const handleSlotTimeChange = (e, value) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSlotTimes(prevSlotTimes => [...prevSlotTimes, value]);
        } else {
            setSlotTimes(prevSlotTimes => prevSlotTimes.filter(slotTime => slotTime !== value));
        }
    };


    const handleDaysChange = (selectedOptions) => {
        setSelectedDays(selectedOptions);
      };


    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['appliedTrainer', user?.email],
        queryFn: async () => {
            const res = await axiosSecurePrivte.get(`/alltrainer/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email && !authLoading,
    });

    const { register, setValue, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (data) {
            setValue('name', data.name || '');
            setValue('age', data.age || '');
            setValue('email', data.user_email || '');
            setValue('skills', data.skills || '');
            setValue('availableTime', data.availableTime || '');
            setValue('otherInfo', data.otherInfo || '');
            setValue('status', 'trainer');
        }
    }, [data, setValue]);

    const handleUpdate = (id) => {
       
    }





    const onSubmit = async (formData) => {
        
        const formDataWithSlotTimes = { ...data, SlotTime: slotTimes, AvailableDaysAWeek: selectedDays, Classes: selectedClasses  };
       
        try {
            
            const response = await axiosSecurePrivte.put(`/trainers/${data?._id}`, formDataWithSlotTimes);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Slot added successfully',
                    confirmButtonText: 'OK'
                });
                refetch();
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while updating the trainer. Please try again later.',
                confirmButtonText: 'OK'
            });
        }
    };

    if (authLoading || isLoading || classesLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const slotTimeOptions = [
        { value: '10:00-11:00', label: '10:00-11:00' },
        { value: '11:00-12:00', label: '11:00-12:00' },
        { value: '12:00-1:00', label: '12:00-1:00' },
        { value: '2:00-3:00', label: '2:00-3:00' },
        { value: '3:00-4:00', label: '3:00-4:00' },
        { value: '6:00-8:00', label: '6:00-8:00' },
    ];
    const daysOfWeekOptions = [
        { value: 'Sunday', label: 'Sunday' },
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' }
      ];

    return (
        <div>
            <div className='p-5 mb-4 flex font-Rilway'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-5">
                        <div>
                            <img width={250} className="rounded-xl" height={250} src={data?.photoURL} alt="" />
                        </div>
                        <div className="grid grid-cols-3">
                            <div>
                                <div>
                                    <input
                                        disabled className="mt-1 text-2xl font-bold block w-full"
                                        {...register("name")}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold text-base">Skills:</label>
                                    <input
                                        disabled className="block w-full"
                                        {...register("skills")}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-center">
                                    <label className="block text-gray-700 font-bold text-base">Age</label>
                                    <input
                                        disabled type="number"
                                        className="mt-1 block border-none w-full"
                                        {...register("age")}
                                    />
                                </div>
                                <div className="mb-4 flex items-center justify-center">
                                    <label className="block text-gray-700 font-bold text-base">Email</label>
                                    <input
                                        disabled type="text"
                                        className="border-none block w-full"
                                        {...register("email")}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold text-base">Available Days:</label>
                                <div className="ml-[20%]">
                                    {data.AvailableDaysAWeek?.map((day, index) => (
                                        <div key={index} className="flex items-center">
                                            <input
                                                disabled type="checkbox"
                                                value={day.value}
                                                {...register("availableDays")}
                                            />
                                            <label className="ml-2">{day.label}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4 flex items-center gap-3">
                                <label className="block text-gray-700 font-bold text-base">Available Time:</label>
                                <input
                                    disabled className="block w-full"
                                    {...register("availableTime")}
                                />
                            </div>
                            <div className="mb-4 flex items-center gap-3">
                                <label className="block text-gray-700 font-bold text-base">Status:</label>
                                <input
                                    disabled className="block w-full"
                                    {...register("status")}
                                />
                            </div>
                        </div>
                    </div>
                    <hr className='-ml-0 h-[1px] border-none bg-slate-300 mx-auto mb-5 w-[
                        100%]' />
                    <div className="mb-4 border-b pb-5 border-gray-300 flex items-center justify-between gap-10">
                        <label className="block text-gray-700 font-bold text-base">Other Info:</label>
                        <input
                            disabled type='textarea'
                            className="hidden w-full"
                            {...register("otherInfo")}
                        />
                        <h1>{data.otherInfo}</h1>
                    </div>
<div className="w-[60%] mx-auto border border-blue-300 p-5 shadow-xl rounded-xl">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Available Days a Week</span>
                        </label>
                        <Select
                            isMulti
                            options={daysOfWeekOptions}
                            value={selectedDays}
                            onChange={handleDaysChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Select Classes</span>
                        </label>
                        <Select
                            isMulti
                            defaultValue={selectedClasses}
                            onChange={setSelectedClasses}
                            options={options}
                        />
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Slot Times</span>
                        </label>
                        <div className="grid grid-cols-3">
                            {slotTimeOptions.map((slot, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`slot-${index}`}
                                        value={slot.value}
                                        {...register(`slotTimes.${index}`)}
                                        onChange={e => handleSlotTimeChange(e, slot.value)}
                                    />
                                    <label htmlFor={`slot-${index}`} className="ml-2">{slot.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    
                    
                    <div className="modal-action">
                        <button onClick={() => handleUpdate(data._id)} type="submit" className="btn text-white px-5 mx-auto bg-[#155E75]">ADD</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewSlot;