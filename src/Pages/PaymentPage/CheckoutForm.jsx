import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

// import useCart from "../../../hooks/useCart";
// import useAuth from "../../../hooks/useAuth";
 import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { axiosSecure } from "../../Hook/useAxiosSecure";
import UseAuth from "../../Hook/useAuth";
import useAxiosSecurePrivate from "../../Hook/useAxiosSecurePrivate";


const CheckoutForm = ({formDatas, classe, price}) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    // const [paymentData, setPaymentData] = useState({});
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecurePrivte = useAxiosSecurePrivate()
    const {user} =UseAuth()
    console.log(formDatas)
    const navigate = useNavigate();

    const totalPrice = price;
console.log(totalPrice)
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])

    const handleSubmit = async(event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            <p>payment error, ${error}</p>
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

               
                const payment = {
                   
                    price: price,
                    name: user?.displayName,
                    email: user?.email,
                    transactionId: paymentIntent.id,
                    date: new Date(), 
                   
                
                    status: 'pending'
                }
                
                axiosSecure.put(`/NewClass/${formDatas?.selectedClass}`, classe);
                axiosSecurePrivte.post("/payment", {...payment,...formDatas}).then(res=>{
                    
                    if (res) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Thank you for your order",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        const paymentData=({ ...payment, ...formDatas });
                        navigate('/paymentHistory', { state: { paymentData: paymentData } });
                    }
                })
               
               
               

            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn px-10 font-bold mx-auto mt-10 btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay & Confirm
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;