import { Helmet } from "react-helmet";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import Swal from "sweetalert2"; 


const MyApplicationDetails = () => {

    const details = useLoaderData()
    const axiosSecure = useAxiosSecure() 
    const navigate = useNavigate()

    const { _id, applicantPhoneNumber, applicationFees, serviceCharge, totalFee, applicantUniversityName, applicantAddress, applicantName, scholarshipName, applicantScholarshipCategory, gender, universityCity, universityCountry, universityImage, applicantSubjectCategory, applicantDegree, SSCresult, HSCresult, UserEmail, userName, status, applicantImage, applicantDate } = details

    const date = new Date(applicantDate)
    const formattedDateOnly = date.toLocaleDateString()
    const formattedDate = date.toLocaleString();

    const handleDeleteApplication = details => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete application...!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/applies/${details?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) { 
                            Swal.fire({
                                title: "Deleted!",
                                text: ` application has been deleted.`,
                                icon: "success"
                            });
                            navigate('/dashboard/myApplication')
                        }
                    })
            }
        });
    }


    return (
        <div>

            <div className="shadow-lg p-4 md:flex gap-6 m-5 ">
                <Helmet>
                    <title>SM || my Application Details</title>
                </Helmet>
                <div className="flex justify-center mb-3">
                    <img className="md:w-[600px] md:h-[500px]" src={universityImage} alt="" />
                </div>
                <div className="space-y-2 flex-1">
                    <p><span className="font-bold">Scholarship Name :</span> {scholarshipName}</p>

                    <p><span className="font-bold">scholarship Category :</span> {applicantScholarshipCategory}</p>
                    <p><span className="font-bold">University Name :</span> {applicantUniversityName}</p>
                    <p><span className="font-bold">University Country :</span> {universityCountry}</p>
                    <p><span className="font-bold">University City :</span> {universityCity}</p>
                    <p><span className="font-bold">Subject Category :</span> {applicantSubjectCategory}</p>
                    <p><span className="font-bold">Degree :</span> {applicantDegree}</p>

                    <div className=" ">
                        <p><span className="font-bold">Apply Date :</span> {formattedDate}</p>
                        <p><span className="font-bold">Application Fees :</span> $ {applicationFees}</p>
                        <p><span className="font-bold">Service Charge :</span> ${serviceCharge}</p>
                    </div>
                    <div className=" ">
                        <p><span className="font-bold">SSC Result :</span>GPA- {SSCresult}  </p>
                        <p><span className="font-bold">HSC Result :</span>GPA- {HSCresult}  </p>
                        <p><span className="font-bold">Phone Number :</span> {applicantPhoneNumber}  </p>
                        <p><span className="font-bold">Application Status :</span> {status}</p>
                    </div>
                    <div className="flex gap-3">
                        <img className="w-16 mt-1 h-16 rounded-lg" src={applicantImage} alt="" />
                        <div>
                            <p><span className="font-bold">Applicant Name :</span> {applicantName}</p>
                            <p><span className="font-bold">Applicant Address :</span> {applicantAddress}</p>
                            <p><span className="font-bold">Gender :</span> {gender}</p>
                        </div>
                    </div>
                    <p className="border-b-2 border-yellow-500 my-2"></p>
                    <div className=" flex justify-between">

                        <Link to={-1}> <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md my-3 text-white font-bold">Back</button></Link>

                        <div className="tooltip tooltip-top" data-tip="Edit">
                            <Link to={`/dashboard/editApplication/${_id}`}><button disabled={ status === 'processing' || status==='completed'} className="  btn-ghost text-2xl text-red-500 border-red-200 bg-orange-200 px-4 py-2 rounded-md my-3"><FaEdit /> </button></Link>
                        </div>

                        <div className="tooltip tooltip-top" data-tip="Delete">
                            <button onClick={() => handleDeleteApplication(details)}  disabled={ status === 'processing' || status==='completed'} className="  btn-ghost text-2xl text-red-500 border-red-200 bg-orange-200 px-4 py-2 rounded-md my-3"><MdOutlineDeleteForever /> </button>
                        </div>

                    </div>
                </div>

            </div>


        </div>
    );
};

export default MyApplicationDetails;