import { Helmet } from "react-helmet";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../components/Hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";





const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const UpdateScholarship = () => {

    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    // const scholarship = useLoaderData()
    const {id} = useParams()

    const { data: scholar={}, isPending} = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships/${id}`) 
            return res.data
        }
    })

    const { _id,
        postDate,
        applicationDeadline,
        // postedUserEmail,
        scholarshipName,
        universityCity,
        universityCountry,
        universityName,
        universityWorldRank,
        subjectCategory,
        scholarshipCategory,
        degree,
        applicationFees,
        serviceCharge,
        image,
    } = scholar

    const handleUpdateScholarship = async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget);
        const scholarshipName = form.get('scholarshipName');
        const universityName = form.get('universityName');
        const universityCountry = form.get('universityCountry');
        const universityCity = form.get('universityCity');
        const universityWorldRank = form.get('universityWorldRank');
        const subjectCategory = form.get('subjectCategory');
        const scholarshipCategory = form.get('scholarshipCategory');
        const degree = form.get('degree');
        const applicationFees = form.get('applicationFees');
        const serviceCharge = form.get('serviceCharge');
        const postDate = form.get('postDate');
        const applicationDeadline = form.get('applicationDeadline');
        const postedUserEmail = user?.email;
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


            const data = {
                postDate,
                applicationDeadline,
                postedUserEmail,
                scholarshipName,
                universityCity,
                universityCountry,
                universityName,
                universityWorldRank,
                subjectCategory,
                scholarshipCategory,
                degree,
                applicationFees,
                serviceCharge,
                image: imageUrl || image,
            };

            
            const res = await axiosSecure.patch(`/scholarships/${_id}`, data)
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "success !",
                    text: `Scholarship update successfully !`,
                    icon: "success"
                });
                navigate('/dashboard/manageScholarship')
            }

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }
    }

    if(loading || isPending){
        return <Loading></Loading>
    }

    return (
        <div className="my-10 mx-5">
            <Helmet>
                <title>SM || Update Scholarship</title>
            </Helmet>
            <h3 className="text-lg md:text-2xl font-bold text-yellow-600 text-center my-3">Update Scholarship</h3>
            <div className="w-4/5 p-5 mx-auto shadow-2xl border rounded-md">

                <Link to={-1} className="text-xl"><button className="my-5 bg-yellow-500 hover:bg-yellow-700 w-10 h-10 flex justify-center items-center text-white rounded-full "><FaArrowLeft ></FaArrowLeft></button></Link>

                <form
                    onSubmit={handleUpdateScholarship}
                >
                    <div className="grid md:grid-cols-2 gap-2">
                        <div>
                            <p>Scholarship Name</p>
                            <input defaultValue={scholarshipName} className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="scholarshipName" placeholder="Scholarship Name" id="scholarshipName" />
                        </div>
                        <div>
                            <p>University Name</p>
                            <input defaultValue={universityName} className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="universityName" placeholder="University Name" id="universityName" />
                        </div>
                        <div>
                            <p>University Country</p>
                            <select defaultValue={universityCountry} name='universityCountry' className="border-2 rounded-md w-full px-4 py-2 mb-2"  >
                                <option disabled selected>Select One</option>
                                <option value="United States">United States</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Japan">Japan</option>
                                <option value="Australia">Australia</option>
                                <option value="Canada">Canada</option>
                            </select>
                        </div>
                        <div>
                            <p>University City</p>
                            <input defaultValue={universityCity} className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="universityCity" placeholder="University City" id="universityCity" />
                        </div>
                        <div>
                            <p>University World Rank</p>
                            <input defaultValue={universityWorldRank} className="border-2 rounded-md w-full px-4 py-2 mb-2" type="number" name="universityWorldRank" placeholder="University World Rank" id="universityWorldRank" />
                        </div>
                        <div>
                            <p>Subject Category</p>
                            <select defaultValue={subjectCategory} name='subjectCategory' className="border-2 rounded-md w-full px-4 py-2 mb-2"  >
                                <option disabled selected>Select One</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Doctor">Doctor</option>
                            </select>
                        </div>
                        <div>
                            <p>Scholarship Category</p>
                            <select defaultValue={scholarshipCategory} name='scholarshipCategory' className="border-2 rounded-md w-full px-4 py-2 mb-2"  >
                                <option disabled selected>Select One</option>
                                <option value="Full fund">Full fund</option>
                                <option value="Partial">Partial</option>
                                <option value="Self fund">Self fund</option>
                            </select>
                        </div>
                        <div>
                            <p>Degree</p>
                            <select defaultValue={degree} name='degree' className="border-2 rounded-md w-full px-4 py-2 mb-2"  >
                                <option disabled selected>Select One</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Masters">Masters</option>
                            </select>
                        </div>
                        <div>
                            <p>Application Fees</p>
                            <input defaultValue={applicationFees} className="border-2 rounded-md w-full px-4 py-2 mb-2" type="number" name="applicationFees" placeholder="Application Fees" id="applicationFees" />
                        </div>
                        <div>
                            <p>Service Charge</p>
                            <input defaultValue={serviceCharge} className="border-2 rounded-md w-full px-4 py-2 mb-2" type="number" name="serviceCharge" placeholder="Service Charge" id="serviceCharge" />
                        </div>
                        <div>
                            <p>Post Date</p>
                            <input defaultValue={postDate} className="border-2 rounded-md w-full px-4 py-2 mb-2" type="date" name="postDate" id="postDate" />
                        </div>
                        <div>
                            <p>Application Deadline</p>
                            <input defaultValue={applicationDeadline} className="border-2 rounded-md w-full px-4 py-2 mb-2" type="date" name="applicationDeadline" id="applicationDeadline" />
                        </div>
                        <div>
                            <p>Image</p>
                            <input type="file" name="image" id="image" className="border-2 rounded-md w-full px-4 py-2 mb-2" />
                        </div>
                    </div>
                    <div className="flex justify-center my-5 font-bold">
                        <input type="submit" value="Update Scholarship" className="px-4 py-3 text-white rounded-md bg-yellow-600 hover:bg-yellow-700" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateScholarship;