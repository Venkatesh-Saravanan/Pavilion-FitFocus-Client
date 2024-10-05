
import { FaPrint } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

const PaymentHistory = () => {
    const location = useLocation();
    const paymentData = location.state?.paymentData;

    console.log(paymentData);

    if (!paymentData) {
        return (
            <div className="payment-history">
                <h1>Loading...</h1>
                
            </div>
        );
    }
   const handlePrint = () => {
        window.print(); 
    };
    return (
        <div className="payment-history my-20 bg-slate-200 p-10  rounded mx-auto lg:w-[40%]">
            <h1 className='text-3xl text-green-800 font-semibold text-center pb-5'>Payment History</h1>
            <p className='pb-3'><strong>Transaction ID:</strong> {paymentData.transactionId}</p>
            <p className='pb-3'><strong>C-Name:</strong> {paymentData.name}</p>
            <p className='pb-3'><strong>C-Email:</strong> {paymentData.email}</p>
            <p className='pb-3'><strong>Trainer-Name:</strong> {paymentData.trainerName}</p>
            <p className='pb-3'><strong>Trainer-Email:</strong> {paymentData.trainerEmail}</p> 
            <p className='pb-3'><strong>Price:</strong> ${paymentData.price}</p>
            <p className='pb-3'><strong>Slot:</strong> ${paymentData.selectedSlot}</p>
            <p className='pb-3'><strong>Package:</strong> ${paymentData.package}</p>
            <p className='pb-3'><strong>Date:</strong> {new Date(paymentData.date).toLocaleString()}</p>
            <button
            className="bg-[#1E1743]  float-right hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex gap-3 items-center"
            onClick={handlePrint}
        >
           <FaPrint></FaPrint>
            Print
        </button>
        <div className='pb-10'></div>
        </div>
    );
};

export default PaymentHistory;