import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosSecure } from "../../Hook/useAxiosSecure";
import { useForm } from "react-hook-form";
import useClasses from "../../Hook/useClasses";
import { useEffect, useState } from "react";
import useAxiosSecurePrivate from "../../Hook/useAxiosSecurePrivate";

const TrainerBookedPage = () => {
    const axiosSecurePrivte = useAxiosSecurePrivate()
    const { id, time } = useParams();
    const [selectedClass, setSelectedClass] = useState('');
    const [formData, setFormData] = useState(); 
    const navigate = useNavigate();
    const { data: trainer, isLoading, error } = useQuery({
        queryKey: ['TrainerBooked', id],
        queryFn: async () => {
            const res = await axiosSecurePrivte.get(`/trainers/${id}`);
            return res.data;
        }
    });

    const { classes, classesLoading } = useClasses();

    const { register, setValue, handleSubmit } = useForm();

    useEffect(() => {
        if (trainer) {
            setValue('trainerName', trainer.name || '');
            setValue('trainerEmail', trainer.user_email || '');
            setValue('selectedSlot', time);
        }
    }, [trainer, setValue, time]);

    const onSubmit = (data) => {
        const formData = { ...data, selectedClass };
    
        setFormData(formData); 
        navigate('/payment', { state: { formData } });
    };

    const handleNavigate= () =>{
       
    }
    if (isLoading || classesLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>

            <div className="flex font-Rilway text-xl  flex-col mx-auto bg-slate-200 mt-10 max-w-3xl p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-center font-bold text-2xl pb-10 text-[#2F7955]">
                    Book Your Fitness Session
                    </div>
                    <div className="grid grid-cols-2">
                        <label className="block  text-gray-700 font-bold text-base" htmlFor="trainerName">Trainer Name :</label>
                        <input disabled  id="trainerName" className="block  w-full bg-slate-200" {...register('trainerName')} />
                    </div>
                    <div className="grid grid-cols-2">
                        <label className="block  text-gray-700 font-bold text-base" htmlFor="trainerName">Trainer Email :</label>
                        <input disabled  id="trainerName" className="block  w-full bg-slate-200" {...register('trainerEmail')} />
                    </div>

                    <div className="grid grid-cols-2">
                        <label className="block mt-2 text-gray-700 font-bold text-base" htmlFor="selectedSlot">Selected Slot: </label>
                        <input disabled id="selectedSlot" type="text" className="block w-full bg-slate-200 border-none" {...register('selectedSlot')} />
                    </div>

                    <div className="form-control ">
                        <div className="grid grid-cols-2">
                        <label className="block text-gray-700 font-bold text-base label">
                            <span className="label-text text-base">Select your Class</span>
                        </label>
                      <></>
                        </div>
                       
                        <div className="flex flex-wrap w-[80%] mx-auto ">
                            {classes?.map(cls => (
                                <div key={cls.className} className="mr-4 font-normal">
                                    <input
                                    required
                                    type="radio"
                                    id={cls.className}
                                    name="class"
                                    value={cls.className}
                                    onChange={() => setSelectedClass(cls.className)}
                                    className="mr-2 "
                                    />
                                    <label className="text-gray-700 font-normal  text-base" htmlFor={cls.className}>{cls.className}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold text-base" htmlFor="package">Package</label>
                        <select id="package" className="block w-full" {...register('package')}>
                            <option value="basic">Basic</option>
                            <option value="standard">Standard</option>
                            <option value="premium">Premium</option>
                        </select>
                    </div>
                    <h1 className="text-green-500 text-lg mb-4">Please show below to know about our package details</h1>
                    <div className="flex item-center justify-center">

                   
                    <button onClick={handleNavigate} type="submit" className="block btn bg-[#1E1743] text-white font-bold py-2 px-4 rounded mt-4">
                   
                   Join Now
                </button>
                </div>
                </form>
            </div>










            <section className="py-20 dark:bg-gray-100 dark:text-gray-800">
                <div className="container px-4 mx-auto">
                    <div className="max-w-2xl mx-auto mb-16 text-center">
                        <span className="font-bold tracking-wider uppercase dark:text-violet-600">Pricing</span>
                        <h2 className="text-4xl font-bold lg:text-5xl">Choose your best plan</h2>
                    </div>

                    <div className="flex flex-wrap items-stretch -mx-4">
                        {/* Basic Membership */}
                        <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
                            <div className="flex bg-slate-200 flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-gray-50">
                                <div className="space-y-2">
                                    <h4 className="text-2xl font-bold">Basic Membership</h4>
                                    <span className="text-6xl font-bold">$10
                                        <span className="text-sm tracking-wide">/month</span>
                                    </span>
                                </div>
                                <p className="mt-3 leading-relaxed dark:text-gray-600">Access to gym facilities during regular operating hours.</p>
                                <ul className="flex-1 mb-6 dark:text-gray-600">
                                    <li className="flex mb-2 space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Use of cardio and strength training equipment</span>
                                    </li>
                                    <li className="flex mb-2 space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Access to locker rooms and showers</span>
                                    </li>
                                </ul>
                                <button type="button" className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded dark:bg-violet-600 dark:text-gray-50">Get Started</button>
                            </div>
                        </div>










                        {/* Standard Membership */}
                        <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
                            <div className="flex bg-slate-200 flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-violet-600 dark:text-gray-50">
                                <div className="space-y-2">
                                    <h4 className="text-2xl font-bold">Standard Membership</h4>
                                    <span className="text-6xl font-bold">$50
                                        <span className="text-sm tracking-wide">/month</span>
                                    </span>
                                </div>
                                <p className="leading-relaxed">All benefits of the basic membership.</p>
                                <ul className="flex-1 space-y-2">
                                    <li className="flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Access to group fitness classes such as yoga, spinning, and Zumba</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Use of additional amenities like a sauna or steam room</span>
                                    </li>
                                </ul>
                                <a rel="noopener noreferrer" href="#" className="inline-block w-full px-5 py-3 font-bold tracking-wider text-center rounded dark:bg-gray-100 dark:text-violet-600">Get Started</a>
                            </div>
                        </div>

                        {/* Premium Membership */}
                        <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
                            <div className="flex bg-slate-200 flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-gray-50">
                                <div className="space-y-2">
                                    <h4 className="text-2xl font-bold">Premium Membership</h4>
                                    <span className="text-6xl font-bold">$100
                                        <span className="text-sm tracking-wide">/month</span>
                                    </span>
                                </div>
                                <p className="leading-relaxed dark:text-gray-600">All benefits of the standard membership.</p>
                                <ul className="space-y-2 dark:text-gray-600">
                                    <li className="flex items-start space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Access to personal training sessions with certified trainers</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Discounts on additional services such as massage therapy or nutrition counseling</span>
                                    </li>
                                </ul>
                                <a rel="noopener noreferrer" href="#" className="inline-block w-full px-5 py-3 font-semibold tracking-wider text-center rounded dark:bg-violet-600 dark:text-gray-50">Get Started</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TrainerBookedPage;