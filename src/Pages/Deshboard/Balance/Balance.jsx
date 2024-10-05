import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../Hook/useAxiosSecure";
import { useEffect, useState } from "react";
import { RiPriceTagFill } from "react-icons/ri";
import { PieChart } from 'react-minimal-pie-chart';
import useAxiosSecurePrivate from "../../../Hook/useAxiosSecurePrivate";

const Balance = () => {
    const [price, setPrice] = useState(0);

    const axiosSecurePrivte = useAxiosSecurePrivate()
    const { data: paymentsData, isLoading, error } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecurePrivte.get("/payment");
            return res.data;
        }
    });

   
    const { data: newsletterData, isLoading: newsletterLoading, error: newsletterError } = useQuery({
        queryKey: ['newsletter'],
        queryFn: async () => {
            const res = await axiosSecurePrivte.get("/newsLatter");
            return res.data;
        }
    });

    useEffect(() => {
        if (paymentsData) {
            let totalPrice = 0;
            paymentsData.forEach(payment => {
               
                if (!isNaN(parseInt(payment.price))) {
                    totalPrice += parseInt(payment.price);
                }
            });
            setPrice(totalPrice);
        }
    }, [paymentsData]);

    if (isLoading || newsletterLoading) {
        return <div>Loading...</div>;
    }

    if (error || newsletterError) {
        return <div>Error loading data</div>;
    }

    const chartData = [
        { title: 'Newsletter Subscribers', value: newsletterData.length, color: '#E38627' },
        { title: 'Paid Members', value: paymentsData.length, color: '#155E75' },
    ];

    return (
        <div>
            <section className="p-6 my-6 dark:bg-gray-100 dark:text-gray-800">
                <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
                    <div>
                        <div className="p-7 bg-slate-200 text-3xl font-bold rounded-xl gap-2">
                            <div className="flex items-center justify-center">
                                <div>
                                    <RiPriceTagFill size={48} />
                                </div>
                                <div>
                                    <h1>{price}</h1>
                                </div>
                            </div>
                            <h1 className="mt-5 text-xl text-center">Total Balance</h1>
                        </div>
                        <div className="mt-5 p-7 bg-slate-200 text-3xl font-bold rounded-xl gap-2">
                            <div className="flex items-center justify-center">
                                <div>
                                    <RiPriceTagFill size={48} />
                                </div>
                                <div>
                                    <h1>{paymentsData?.length}</h1>
                                </div>
                            </div>
                            <h1 className="mt-5 text-xl text-center">Total Paid User</h1>
                        </div>
                    </div>

                    <div className="overflow-x-auto col-span-3">
                        <table className="table">
                          
                            <thead>
                                <tr className="bg-[#0C7EA0] text-white text-base text-center">
                                    <th></th>
                                    <th>Customer Name</th>
                                    <th>Selected Slot</th>
                                    <th>Package</th>
                                    <th>Price</th>
                                    <th>Trainer Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentsData?.slice(0, 6).map((bookingHistory, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{bookingHistory.name}</td>
                                        <td>{bookingHistory.selectedSlot}</td>
                                        <td>{bookingHistory.package}</td>
                                        <td>{bookingHistory.price}</td>
                                        <td>{bookingHistory.trainerName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <div className="flex items-center justify-around">
                <div className='w-96 h-96 '>
                    <PieChart
                        data={chartData}
                        label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}`}
                        labelStyle={{
                            fontSize: '2px',
                            fontWeight: 'bold',
                            fill: '#fff',
                            textAnchor: 'middle',
                            dominantBaseline: 'central',
                        }}
                        labelPosition={75}
                    />
                </div>
                <div className="">
                    <h1 className="text-lg font-bold text-[#E38627]">Newsletter Subscribers: {newsletterData?.length}</h1>
                    <h1 className="text-lg font-bold text-[#155E75]">Paid Members: {paymentsData?.length}</h1>
                </div>
            </div>
        </div>
    );
};

export default Balance;