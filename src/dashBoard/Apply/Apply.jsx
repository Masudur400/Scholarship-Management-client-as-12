import axios from "axios";
import { Helmet } from "react-helmet";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../components/Hooks/useAuth";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import { useState } from "react"; 
import Swal from "sweetalert2";



const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Apply = () => {

    const applyShip = useLoaderData()
    const navigate = useNavigate()
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const { _id, postDate, applicationDeadline, scholarshipName, universityCity, universityCountry, universityName, universityWorldRank, subjectCategory, scholarshipCategory, degree, applicationFees, serviceCharge, image } = applyShip

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const handleAddScholarship = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const applicantName = form.get('applicantName');
        const applicantPhoneNumber = form.get('applicantPhoneNumber');
        const applicantUniversityName = universityName;
        const applicantAddress = form.get('applicantAddress');
        const gender = form.get('gender');
        const applicantSubjectCategory = subjectCategory;
        const applicantScholarshipCategory = scholarshipCategory
        const applicantDegree = form.get('degree');
        const SSCresult = form.get('SSCresult');
        const HSCresult = form.get('HSCresult');
        const UserEmail = user?.email;
        const userName = user?.displayName
        const imageFile = form.get('image');

        // if (applicantPhoneNumber != 11) {
        //     return  setPhoneNumberError('phone number will be equal 11 ') 
        // } 
        // else if(!applicantPhoneNumber > 10){
        //     setPhoneNumberError('phone number will be equal 11 ')
        //     return
        // }
        // setPhoneNumberError('')

        try {
            const imageData = new FormData();
            imageData.append('image', imageFile);

            const imageRes = await axios.post(imageHostingApi, imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = imageRes.data.data.url;

            const date = new Date()
             
            const parsfee = parseInt(applicationFees)
            const parscharge = parseInt(serviceCharge)
            const totalFee = parsfee + parscharge

            const data = {
                applicantPhoneNumber,
                applicationFees:applicationFees ,
                serviceCharge:serviceCharge,
                totalFee: totalFee,
                applicantUniversityName,
                applicantAddress,
                applicantName,
                scholarshipName,
                applicantScholarshipCategory,
                gender,
                universityCity,
                universityCountry,
                universityImage: image,
                applicantSubjectCategory,
                applicantDegree,
                SSCresult,
                HSCresult,
                UserEmail,
                userName,
                status: 'pending',
                applicantImage: imageUrl, 
                applicantDate: date
            };


            const res = await axiosSecure.post('/applies', data)
            if (res.data.insertedId) {
                Swal.fire({
                    title: "success !",
                    text: `accepted your data !`,
                    icon: "success"
                }); 
                navigate(`/dashboard/payment/${_id}`)
            }

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }
    };

    return (
        <div className="my-10 mx-5">
            
            <Helmet>
                <title>SM || Apply Scholarship</title>
            </Helmet>
            <h3 className="text-lg md:text-2xl font-bold text-yellow-600 text-center my-3">Add Scholarship</h3>
            <div className="w-4/5 p-5 mx-auto shadow-2xl border rounded-md">
                <form onSubmit={handleAddScholarship}>
                    <div className="grid md:grid-cols-2 gap-2">
                        <div>
                            <p>Applicant Name</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="applicantName" placeholder="Applicant Name" id="applicantName" required />

                        </div>
                        <div>
                            <p>Applicant phone number</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="applicantPhoneNumber" placeholder="Applicant phone number" id="applicantPhoneNumber" required />
                            {phoneNumberError && <p className="text-red-500">{phoneNumberError}</p>}
                        </div>
                        <div>
                            <p>University Name</p>
                            <input defaultValue={universityName} disabled className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="universityName" placeholder="University Name" id="universityName" required />
                        </div>

                        <div>
                            <p>Applicant address</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="applicantAddress" placeholder="(village,district,country)" id="applicantAddress" required />
                        </div>

                        <div>
                            <p>Applicant gender</p>
                            <select name='gender' className="border-2 rounded-md w-full px-4 py-2 mb-2" required>
                                <option disabled selected>Select One</option>
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                        </div>
                        <div>
                            <p>Subject Category</p>
                            <input defaultValue={subjectCategory} disabled className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="" id="" />
                        </div>
                        <div>
                            <p>Scholarship Category</p>
                            <input defaultValue={scholarshipCategory} disabled className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="" id="" />
                        </div>
                        <div>
                            <p>Applicant Applying Degree</p>
                            <select name='degree' className="border-2 rounded-md w-full px-4 py-2 mb-2" required>
                                <option disabled selected>Select One</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Masters">Masters</option>
                            </select>
                        </div>
                        <div>
                            <p>SSC Result</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="SSCresult" placeholder="SSC Result" id="SSCresult" required />
                        </div>
                        <div>
                            <p>HSC result</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="HSCresult" placeholder="HSC Result" id="HSCresult" required />
                        </div>

                        <div>
                            <p>Applicant photo</p>
                            <input type="file" name="image" id="image" className="border-2 rounded-md w-full px-4 py-2 mb-2" required />
                        </div>
                    </div>
                    <div className="flex justify-center my-5 font-bold">
                        <button type="submit" className="px-4 py-3 text-white rounded-md bg-yellow-600">Next</button>

                    </div>
                </form>
            </div>


        </div>
    );
};

export default Apply;