import { Helmet } from "react-helmet";
import { Link, useLoaderData } from "react-router-dom";

 
const MyApplicationDetails = () => {

    const details = useLoaderData()

    const { _id,applicantPhoneNumber, applicationFees, serviceCharge, totalFee, applicantUniversityName, applicantAddress, applicantName, scholarshipName, applicantScholarshipCategory, gender, universityCity, universityCountry, universityImage, applicantSubjectCategory, applicantDegree, SSCresult, HSCresult, UserEmail, userName, status, applicantImage, normalDate } = details 

    const date = new Date(normalDate)
    const formattedDateOnly = date.toLocaleDateString()
    const formattedDate = date.toLocaleString();


    return (
        <div>
             
            <div className="shadow-lg p-4 md:flex gap-6  ">
                <Helmet>
                    <title>SM || my Application Details</title>
                </Helmet>
                <div className="flex justify-center mb-3">
                    <img className="md:w-[600px] md:h-[425px]" src={universityImage} alt="" />
                </div>
                <div className="space-y-2 flex-1">
                    <p><span className="font-bold">Scholarship Name :</span> {scholarshipName}</p>
                    <p><span className="font-bold">Applicant Name :</span> {applicantName}</p>
                    <p><span className="font-bold">Applicant Address :</span> {applicantAddress}</p>
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
                        <p><span className="font-bold">SSC Result :</span> {SSCresult}  </p>
                        <p><span className="font-bold">HSC Result :</span> {HSCresult}  </p>
                    </div>
                    <p className="border-b-2 border-yellow-500 my-2"></p>
                    <div className=" flex justify-center"> 

                        <Link to={-1}> <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md my-3 text-white font-bold">Back</button></Link>
                    </div>
                </div>

            </div>
            
            
        </div>
    );
};

export default MyApplicationDetails;