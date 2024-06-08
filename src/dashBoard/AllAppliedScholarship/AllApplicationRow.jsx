import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { TbListDetails } from 'react-icons/tb';
import { FaEdit } from 'react-icons/fa';
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllApplicationRow = ({ apply, idx, refetch }) => {

    const axiosSecure  = useAxiosSecure()

    const { _id, applicantPhoneNumber, applicationFees, serviceCharge, totalFee, applicantUniversityName, applicantAddress, applicantName, scholarshipName, applicantScholarshipCategory, gender, universityCity, universityCountry, universityImage, applicantSubjectCategory, applicantDegree, SSCresult, HSCresult, UserEmail, userName, status, applicantImage, normalDate, feedBack } = apply

    const handleFeedBack = async(e) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget);
        const feedBack = form.get('feedBack'); 

        try { 
            const data = {applicantName,applicantPhoneNumber,applicantUniversityName,applicantAddress,gender,applicantSubjectCategory,applicantScholarshipCategory,applicantDegree,SSCresult,HSCresult,status:status,feedBack:feedBack,applicantImage:applicantImage} 

            
            const res = await axiosSecure.patch(`/applies/${_id}`, data)
            if (res.data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    title: "success !",
                    text: `feedBack successfully !`,
                    icon: "success"
                });
                
            }

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }  
        document.getElementById("my_modal_5").close();
    }

    const handleStatus = async(e) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget);
        const status = form.get('status'); 

        try { 
            const data = {applicantName,applicantPhoneNumber,applicantUniversityName,applicantAddress,gender,applicantSubjectCategory,applicantScholarshipCategory,applicantDegree,SSCresult,HSCresult,status:status,feedBack:feedBack,applicantImage:applicantImage} 

            
            const res = await axiosSecure.patch(`/applies/${_id}`, data)
            if (res.data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    title: "success !",
                    text: `status update successfully !`,
                    icon: "success"
                });
                
            }

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }  


        document.getElementById("my_modal_3").close();
    }

    return (
        <>

            <tr className='hover:shadow-md'>
                <td> {idx + 1} </td>
                <td> University Name: {applicantUniversityName} </td>
                <td>
                    <p>
                        University Country: {universityCountry}
                    </p>
                    <p>
                        University City: {universityCity}
                    </p>
                </td>
                <td>
                    <p>
                        Subject Category: {applicantSubjectCategory}
                    </p>
                    <p>
                        Applied Degree: {applicantDegree}
                    </p>
                </td>
                <td>
                    <p>
                        Application Fees: {applicationFees} $
                    </p>
                    <p>
                        Service charge: {serviceCharge} $
                    </p>
                </td>

                <td><button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn btn-sm">FeedBack</button></td>
                <td><button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn btn-sm">{status}</button></td>
                <td className='space-y-3 flex flex-col'>

                    <Link to={``}><button className=" px-4 py-2 rounded-md  text-white bg-yellow-500 hover:bg-yellow-600">Details</button></Link>

                    <button className=" px-4 py-2 rounded-md  text-white bg-yellow-500 hover:bg-yellow-600">Cancel</button>

                </td>
            </tr>
            {/* modal feedBack  */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form onSubmit={handleFeedBack} className="modal-box">
                    <div >
                        <h2 className="font-bold text-yellow-500 text-center">FeedBack</h2>
                        <div>
                            <p>Write Your FeedBack</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="feedBack" placeholder="FeedBack" id="" required />
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn  bg-red-500 hover:bg-red-600 text-white font-bold">Close</button>
                            </form>
                        </div>
                    </div>
                    <input type="submit" value='Next' className="btn -mt-12 bg-yellow-500 hover:bg-yellow-600 text-white font-bold absolute" />
                </form>
            </dialog>

            {/* status Modal  */} 
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                       
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleStatus}> 
                        <h2 className="font-bold text-yellow-500 text-center">Status</h2>
                        <div>
                            <p>Change Status</p>
                            <select name='status' className="border-2 rounded-md w-full px-4 py-2 mb-2" required>
                                <option disabled selected>Select One</option>
                                <option value="pending">pending</option>
                                <option value="processing">processing</option>
                                <option value="completed">completed</option>
                            </select>
                        </div> 
                    <input type="submit" value='Next' className="btn bg-yellow-500 hover:bg-yellow-600 text-white font-bold " />
                </form>
                </div>
            </dialog> 

        </>
    );
};

AllApplicationRow.propTypes = {
    apply: PropTypes.object,
    idx: PropTypes.number,
    refetch: PropTypes.func,
}

export default AllApplicationRow;