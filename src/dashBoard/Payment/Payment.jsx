 
const Payment = () => {
    const handlePayment = () =>{
        console.log('clicked');
    }
    return (
        <div>
            payment
            <button onClick={handlePayment} className="btn">pay</button>
        </div>
    );
};

export default Payment;