 
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {  useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';



const stripePromise = loadStripe(import.meta.env.VITE_pk)

const Payment = () => {

    // const payment = useLoaderData()
    const axiosSecure = useAxiosSecure()

    const {id} = useParams()

    const { data: payment={}, isPending} = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships/${id}`) 
            return res.data
        }
    })
     
    const {_id, applicationFees, serviceCharge} = payment 
     

    const totalFee = parseFloat(applicationFees) + parseFloat(serviceCharge) 

    if(isPending){
        return <Loading></Loading>
    }

    return (
        <div>
             <div className=' flex justify-center items-center my-10'>
             <div className='md:w-2/3 mx-auto shadow-lg p-4 rounded-sm border'>
            <h2 className="font-bold text-yellow-500 text-center text-xl">PAYMENT</h2>
            <p className='border border-yellow-600 mx-auto my-2'></p>
             <p className='mb-5 font-bold'>Total Fees: ${totalFee}</p>
                <Elements stripe={stripePromise}>
                     <CheckoutForm totalFee={totalFee} _id={_id}></CheckoutForm>
                </Elements>
            </div>
             </div>
            
        </div>
    );
};

 

export default Payment;