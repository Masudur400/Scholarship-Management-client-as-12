import PropTypes from 'prop-types'
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { Link } from 'react-router-dom';


const MyApplicationDesign = ({ application, idx }) => {

    const { _id,applicantPhoneNumber, applicationFees, serviceCharge, totalFee, applicantUniversityName, applicantAddress, applicantName, scholarshipName, applicantScholarshipCategory, gender, universityCity, universityCountry, universityImage, applicantSubjectCategory, applicantDegree, SSCresult, HSCresult, UserEmail, userName, status, applicantImage, normalDate } = application

   

    return (
        <>

            <tr>
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
                <td>Application Feedback </td>
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
                <td>Application Status: {status}</td>
                <td className='space-y-3 flex flex-col'>
               <div className="tooltip tooltip-bottom"  data-tip="Details">
               <Link to={`/dashboard/myApplicationDetails/${_id}`}><button className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><TbListDetails></TbListDetails> </button></Link>
               </div>

               <div className="tooltip tooltip-bottom"  data-tip="Edit">
               <Link to={`/ /${_id}`}><button className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><FaEdit /> </button></Link>
               </div>

                <div className="tooltip tooltip-top"  data-tip="Delete">
                <button onClick={''} className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><MdOutlineDeleteForever /> </button> 
                </div>
                </td>
            </tr>
        </>

    );
};

MyApplicationDesign.propTypes = {
    application: PropTypes.object,
    idx: PropTypes.num,
}

export default MyApplicationDesign;