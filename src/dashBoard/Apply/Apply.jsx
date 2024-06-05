import axios from "axios";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../components/Hooks/useAuth";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import { useState } from "react";
import Payment from "../Payment/Payment";



const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Apply = () => {

    const applyShip = useLoaderData()
    const [phoneNumberError, setPhoneNumberError] = useState()
    const { postDate, applicationDeadline, scholarshipName, universityCity, universityCountry, universityName, universityWorldRank, subjectCategory, scholarshipCategory, degree, applicationFees, serviceCharge, image } = applyShip

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const handleAddScholarship = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
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
            const year = date.getFullYear()
            const month = date.getMonth()
            const day = date.getDay()

            const data = {
                applicantPhoneNumber,
                applicantUniversityName,
                applicantAddress,
                applicantScholarshipCategory,
                gender,
                applicantSubjectCategory,
                applicantDegree,
                SSCresult,
                HSCresult,
                UserEmail,
                userName,
                applicantDate: {
                    year: year,
                    month: month,
                    day: day
                },
                applicantImage: imageUrl,
            };
            console.table(data)


            await axiosSecure.post('/applies', data)
            // if (res.data.insertedId) {
            //     Swal.fire({
            //         title: "success !",
            //         text: `applied successfully !`,
            //         icon: "success"
            //     });
            // }

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
                            <p>Applicant phone number</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="number" name="applicantPhoneNumber" placeholder="Applicant phone number" id="applicantPhoneNumber" required />
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
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="number" name="SSCresult" placeholder="SSC Result" id="SSCresult" required />
                        </div>
                        <div>
                            <p>HSC result</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="number" name="HSCresult" placeholder="HSC Result" id="HSCresult" required />
                        </div>

                        <div>
                            <p>Applicant photo</p>
                            <input type="file" name="image" id="image" className="border-2 rounded-md w-full px-4 py-2 mb-2" required />
                        </div>
                    </div>
                    <div className="flex justify-center my-5 font-bold">
                        <button onClick={() => document.getElementById('my_modal_5').showModal()} type="submit" className="px-4 py-3 text-white rounded-md bg-yellow-600">Next</button>

                    </div>
                </form>
            </div>
            {/* Modal show  */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form onSubmit={''} className="modal-box">
                    <div >
                        {/* <select name='role' className="border-2 rounded-md w-full px-4 py-2 mb-2">
                                <option disabled selected>Select One</option>
                                <option value="admin">admin</option>
                                <option value="moderator">moderator</option>
                                <option value="user">user</option>
                            </select> */}
                        <Payment></Payment>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in div, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>

                    <input type="submit" value='confirm' className="btn -mt-12 absolute" />
                </form>
            </dialog>
        </div>
    );
};

export default Apply;