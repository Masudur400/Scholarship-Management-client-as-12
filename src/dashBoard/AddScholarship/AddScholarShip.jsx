 import axios from 'axios';
import useAuth from '../../components/Hooks/useAuth'; 
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddScholarShip = () => {
    const { user } = useAuth();
    const  axiosSecure = useAxiosSecure()

    const handleAddScholarship = async (e) => {
        e.preventDefault();
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

            const imageRes = await axios.post(imageHostingApi, imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = imageRes.data.data.url;

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
                image: imageUrl,
            }; 

            // Optionally, you can send the data to your backend here using axiosPublic
            // await axiosPublic.post('/scholarships', data);
            const res = await axiosSecure.post('/scholarships', data) 
            if(res.data.insertedId){ 
                Swal.fire({
                    title: "success !",
                    text: `Scholarship added successfully !`,
                    icon: "success"
                  }); 
            }

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }
    };

    return (
        <div className="my-10 mx-5">
            <Helmet>
                <title>SM || Add Scholarship</title>
            </Helmet>
            <h3 className="text-lg md:text-2xl font-bold text-yellow-600 text-center my-3">Add Scholarship</h3>
            <div className="w-4/5 p-5 mx-auto shadow-2xl border rounded-md">
                <form onSubmit={handleAddScholarship}>
                    <div className="grid md:grid-cols-2 gap-2">
                        <div>
                            <p>Scholarship Name</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="scholarshipName" placeholder="Scholarship Name" id="scholarshipName" required />
                        </div>
                        <div>
                            <p>University Name</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="universityName" placeholder="University Name" id="universityName" required />
                        </div>
                        <div>
                            <p>University Country</p>
                            <select name='universityCountry' className="border-2 rounded-md w-full px-4 py-2 mb-2" required>
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
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="universityCity" placeholder="University City" id="universityCity" required />
                        </div>
                        <div>
                            <p>University World Rank</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="number" name="universityWorldRank" placeholder="University World Rank" id="universityWorldRank" required />
                        </div>
                        <div>
                            <p>Subject Category</p>
                            <select name='subjectCategory' className="border-2 rounded-md w-full px-4 py-2 mb-2" required>
                                <option disabled selected>Select One</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Doctor">Doctor</option>
                            </select>
                        </div>
                        <div>
                            <p>Scholarship Category</p>
                            <select name='scholarshipCategory' className="border-2 rounded-md w-full px-4 py-2 mb-2" required>
                                <option disabled selected>Select One</option>
                                <option value="Full fund">Full fund</option>
                                <option value="Partial">Partial</option>
                                <option value="Self fund">Self fund</option>
                            </select>
                        </div>
                        <div>
                            <p>Degree</p>
                            <select name='degree' className="border-2 rounded-md w-full px-4 py-2 mb-2" required>
                                <option disabled selected>Select One</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Masters">Masters</option>
                            </select>
                        </div>
                        <div>
                            <p>Application Fees</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="number" name="applicationFees" placeholder="Application Fees" id="applicationFees" required />
                        </div>
                        <div>
                            <p>Service Charge</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="number" name="serviceCharge" placeholder="Service Charge" id="serviceCharge" required />
                        </div>
                        <div>
                            <p>Post Date</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="date" name="postDate" id="postDate" required />
                        </div>
                        <div>
                            <p>Application Deadline</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="date" name="applicationDeadline" id="applicationDeadline" required />
                        </div>
                        <div>
                            <p>Image</p>
                            <input type="file" name="image" id="image" className="border-2 rounded-md w-full px-4 py-2 mb-2" required />
                        </div>
                    </div>
                    <div className="flex justify-center my-5 font-bold">
                        <input type="submit" value="Add Scholarship" className="px-4 py-3 text-white rounded-md bg-yellow-600" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddScholarShip;
