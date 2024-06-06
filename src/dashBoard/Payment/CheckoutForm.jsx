import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import PropTypes from 'prop-types'
import useAuth from "../../components/Hooks/useAuth";
import Swal from "sweetalert2";


const CheckoutForm = ({totalFee,_id}) => {

    const {user} = useAuth()

    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const axiosSecure = useAxiosSecure()

    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        if(totalFee){
            axiosSecure.post('/create-payment-intent', { fees: totalFee })
            .then(res => { 
                setClientSecret(res.data.clientSecret)
            })
        }
        }, [totalFee,axiosSecure])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement)
        if(card === null){
            return
        }

        const {error, paymentMethod} =await stripe.createPaymentMethod({
            type:'card',
            card
        })
        if(error){
            console.log('payment error', error)
            setError(error.message)
        }
        else{
            console.log('paymentMethod', paymentMethod)
            setError('')
        }


        const { paymentIntent, error:confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if(confirmError){
            console.log('payment error')
        }
        else{
            if(paymentIntent.status === 'succeeded'){ 
                setTransactionId(paymentIntent.id)

                const date = new Date()
                const year = date.getFullYear()
                const month = date.getMonth()
                const day = date.getDay()

                const data = {
                    email:user?.email,
                    applicationFees: totalFee,
                    transactionId: paymentIntent.id, 
                    paymentDate: {
                        year: year,
                        month: month,
                        day: day
                    },  
                    ScholarshipId:_id
                }
              const res= await  axiosSecure.post('/payments', data)  
              console.log(res.data)
              if(res.data.insertedId){
                Swal.fire({
                    title: "success !",
                    text: `payment successfully !`,
                    icon: "success"
                  });
                //   navigate('/dashboard/paymentHistory')
              }

            }
        }




    }

    return (
        <div>
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
      <p className='border border-yellow-600 mx-auto my-2'></p>
      <div className="flex justify-center">
      <button type="submit" disabled={!stripe || !clientSecret} className="px-4 py-3 text-white rounded-md bg-yellow-500 hover:bg-yellow-600 my-3 font-bold">
        Pay
      </button>
      </div>
      <p className="text-red-500">{error}</p>
      {transactionId && <p className="text-green-500">payment successfully</p>}
            </form>
        </div>
    );
};

CheckoutForm.propTypes ={
    totalFee:PropTypes.number,
    _id:PropTypes.string,
}

export default CheckoutForm;