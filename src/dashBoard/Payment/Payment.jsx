 
import { useLoaderData } from 'react-router-dom';



const Payment = () => {

    const payment = useLoaderData()
     
    const {_id, postDate, applicationDeadline, scholarshipName, universityCity, universityCountry, universityName, universityWorldRank, subjectCategory, scholarshipCategory, degree, applicationFees, serviceCharge, image } = payment

     
     

    const totalFee = parseFloat(applicationFees) + parseFloat(serviceCharge)


    const handlePayment = () =>{
        console.log('clicked', applicationFees, serviceCharge);
    }


    return (
        <div>
            <h2 className="font-bold text-yellow-500 text-center">Payment</h2>
             <p>total: {totalFee}</p>
            <button onClick={handlePayment} className="btn">pay</button>
        </div>
    );
};

 

export default Payment;