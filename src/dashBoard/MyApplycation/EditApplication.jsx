import axios from "axios";
import { Helmet } from "react-helmet";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure"; 

 

const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const EditApplication = () => {

    const application = useLoaderData()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { _id, applicantPhoneNumber, applicationFees, serviceCharge, totalFee, applicantUniversityName, applicantAddress, applicantName, scholarshipName, applicantScholarshipCategory, gender, universityCity, universityCountry, universityImage, applicantSubjectCategory, applicantDegree, SSCresult, HSCresult, UserEmail, userName, status, applicantImage, applicantDate }  = application

    const updateApplication = async(e) =>{
        e.preventDefault()

        const form = new FormData(e.currentTarget);
        const applicantName = form.get('applicantName');
        const applicantPhoneNumber = form.get('applicantPhoneNumber');
        const applicantUniversityName = form.get('universityName');
        const applicantAddress = form.get('applicantAddress');
        const gender = form.get('gender');
        const applicantSubjectCategory = form.get('subjectCategory');
        const applicantScholarshipCategory = form.get('scholarshipCategory')
        const applicantDegree = form.get('degree');
        const SSCresult = form.get('SSCresult');
        const HSCresult = form.get('HSCresult'); 
        const imageFile = form.get('image'); 

        try {
            const imageData = new FormData();
            imageData.append('image', imageFile);

            if(imageFile.name){
                var imageRes = await axios.post(imageHostingApi, imageData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } 

            const imageUrl = imageRes?.data?.data?.url;

            const data = {applicantName,applicantPhoneNumber,applicantUniversityName,applicantAddress,gender,applicantSubjectCategory,applicantScholarshipCategory,applicantDegree,SSCresult,HSCresult,applicantImage:imageUrl || applicantImage} 

            
            const res = await axiosSecure.patch(`/applies/${_id}`, data)
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "success !",
                    text: `application update successfully !`,
                    icon: "success"
                });
                navigate(`/dashboard/myApplicationDetails/${_id}`)
            }

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        } 
    } 

    return (
        <div className="my-10 mx-5">  
            <Helmet>
                <title>SM || update application</title>
            </Helmet>
            <h3 className="text-lg md:text-2xl font-bold text-yellow-600 text-center my-3">Edit Application</h3>
            <div className="w-4/5 p-5 mx-auto shadow-2xl border rounded-md">
            <Link to={-1}> <button data-tip="Back" className="tooltip tooltip-top bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md my-3 text-white font-bold"><FaArrowLeftLong></FaArrowLeftLong></button></Link>
                <form onSubmit={updateApplication}>
                    <div className="grid md:grid-cols-2 gap-2">
                        <div>
                            <p>Applicant Name</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" defaultValue={applicantName} name="applicantName" placeholder="Applicant Name" id="applicantName" required />

                        </div>
                        <div>
                            <p>Applicant phone number</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" defaultValue={applicantPhoneNumber} name="applicantPhoneNumber" placeholder="Applicant phone number" id="applicantPhoneNumber" required />
                             
                        </div>
                        <div>
                            <p>University Name</p>
                            <input defaultValue={applicantUniversityName} disabled className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="universityName" placeholder="University Name" id="universityName" required />
                        </div>

                        <div>
                            <p>Applicant address</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" defaultValue={applicantAddress} name="applicantAddress" placeholder="(village,district,country)" id="applicantAddress" required />
                        </div>

                        <div>
                            <p>Applicant gender</p>
                            <select name='gender' defaultValue={gender} className="border-2 rounded-md w-full px-4 py-2 mb-2" required>
                                <option disabled selected>Select One</option>
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                        </div>
                        <div>
                            <p>Subject Category</p>
                            <select name='subjectCategory' defaultValue={applicantSubjectCategory} className="border-2 rounded-md w-full px-4 py-2 mb-2" required>
                                <option disabled selected>Select One</option>
                                <option value="Agriculture">Agriculture </option>
                                <option value="Doctor">Doctor</option>
                                <option value="Engineering">Engineering</option>
                            </select>
                        </div>
                        <div>
                            <p>Scholarship Category</p> 
                            <select name='scholarshipCategory' defaultValue={applicantScholarshipCategory} className="border-2 rounded-md w-full px-4 py-2 mb-2" required>
                                <option disabled selected>Select One</option>
                                <option value="Full fund">Full fund</option>
                                <option value="Partial">Partial</option>
                                <option value="Self fund">Self fund</option>
                            </select>
                        </div>
                        <div>
                            <p>Applicant Applying Degree</p>
                            <select name='degree' defaultValue={applicantDegree} className="border-2 rounded-md w-full px-4 py-2 mb-2" required>
                                <option disabled selected>Select One</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Masters">Masters</option>
                            </select>
                        </div>
                        <div>
                            <p>SSC Result</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" defaultValue={SSCresult} name="SSCresult" placeholder="SSC Result" id="SSCresult" required />
                        </div>
                        <div>
                            <p>HSC result</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" defaultValue={HSCresult} name="HSCresult" placeholder="HSC Result" id="HSCresult" required />
                        </div>

                        <div>
                            <p>Applicant photo</p>
                            <input type="file" name="image" id="image" className="border-2 rounded-md w-full px-4 py-2 mb-2"  />
                        </div>
                    </div>
                    <div className="flex justify-center my-5 font-bold">
                        <button type="submit" className="px-4 py-3 text-white rounded-md bg-yellow-600">Edit</button>

                    </div>
                </form>
            </div>


        </div>
    );
};

export default EditApplication;