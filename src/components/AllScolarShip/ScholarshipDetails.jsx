
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";



const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const ScholarshipDetails = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const scholarShips = useLoaderData()  


    const { _id, postDate, applicationDeadline, postedUserEmail, scholarshipName, universityCity, universityCountry, universityName, universityWorldRank, subjectCategory, scholarshipCategory, degree, applicationFees, serviceCharge, image } = scholarShips
    // console.log(details)


    const handleReview = async (e) => {
        e.preventDefault()
        // const form = new FormData(e.currentTarget);
        // const reviewerName = form.get('reviewerName')
        // const ratingPoint = form.get('ratingPoint')
        // const reviewerComments = form.get('reviewerComments')
        // const imageFile = form.get('image');

        // if (ratingPoint > 5) {
        //     setRatingPoint('rating will be number of 1-5')
        //     return
        // }
        // setRatingPoint('')

        // try {
        //     const imageData = new FormData();
        //     imageData.append('image', imageFile);

        //     const imageRes = await axios.post(imageHostingApi, imageData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });

        //     const imageUrl = imageRes.data.data.url;
        //     const date = new Date()
        //     const year = date.getFullYear()
        //     const month = date.getMonth()
        //     const day = date.getDay()

        //     const data = {
        //         reviewerName,
        //         reviewerEmail:user?.email,
        //         universityName,
        //         ratingPoint,
        //         scholarshipName,
        //         universityImage: image,
        //         reviewerComments,
        //         reviewerImage: imageUrl,
        //         reviewDate: {
        //             year: year,
        //             month: month,
        //             day: day
        //         }
        //     }; 

        //     const res = await axiosSecure.post('/reviews', data)
        // toast.success('review successful')
        //     if (res.data.insertedId) {
        //         Swal.fire({
        //             title: "success !",
        //             text: `review added successfully !`,
        //             icon: "success"
        //         }); 
        //     }

        // } catch (error) {
        //     console.error('Error uploading the image or submitting the form:', error);
        // }

        document.getElementById("my_modal_5").close();
    }

    return (
        <div>
            <ToastContainer autoClose={1000}></ToastContainer>
            <div className="shadow-lg p-4 md:flex gap-6  ">
                <Helmet>
                    <title>SM || Scholarship Details</title>
                </Helmet>
                <div className="flex justify-center mb-3">
                    <img className="md:w-[600px] md:h-[425px]" src={image} alt="" />
                </div>
                <div className="space-y-2 flex-1">
                    <p><span className="font-bold">Scholarship Name :</span> {scholarshipName}</p>
                    <p><span className="font-bold">scholarship Category :</span> {scholarshipCategory}</p>
                    <p><span className="font-bold">University Name :</span> {universityName}</p>
                    <p><span className="font-bold">University Country :</span> {universityCountry}</p>
                    <p><span className="font-bold">University City :</span> {universityCity}</p>
                    <p><span className="font-bold">Subject Category :</span> {subjectCategory}</p>
                    <p><span className="font-bold">Degree :</span> {degree}</p>
                    <p><span className="font-bold">University World Rank :</span> {universityWorldRank} number in the world</p>
                    <div className=" ">
                        <p><span className="font-bold">PostDate :</span> {postDate}</p>
                        <p><span className="font-bold">Deadline :</span> {applicationDeadline}</p>
                    </div>
                    <div className=" ">
                        <p><span className="font-bold">Application Fees :</span> {applicationFees}$ </p>
                        <p><span className="font-bold">Service Charge :</span> {serviceCharge}$ </p>
                    </div>
                    <p className="border-b-2 border-yellow-500 my-2"></p>
                    <div className=" flex justify-between">

                        <Link> <button onClick={() => document.getElementById('my_modal_5').showModal()} className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md my-3 text-white font-bold">Apply Now</button></Link>

                        <Link to={-1}> <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md my-3 text-white font-bold">Back</button></Link>
                    </div>
                </div>

            </div>
            {/* show modal  */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form onSubmit={handleReview} className="modal-box">
                    <div >
                        <h2 className="font-bold text-yellow-500 text-center">Review</h2>
                        <div>
                            <p>Reviewer name</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="reviewerName" placeholder="Reviewer name" id="" required />
                        </div>
                        <div>
                            <p>Rating point</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="number" name="ratingPoint" placeholder="Rating point" id="" required />
                        </div>
                        {ratingPoint && <p className="text-red-500">{ratingPoint}</p>}
                        <div>
                            <p>Reviewer image</p>
                            <input type="file" name="image" id="image" className="border-2 rounded-md w-full px-4 py-2 mb-2" required />
                        </div>
                        <div>
                            <p>Reviewer Comments</p>
                            <textarea name="reviewerComments" placeholder="Reviewer Comments" className="textarea textarea-bordered textarea-xs w-full border-2 rounded-md " required></textarea>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in div, it will close the modal */}
                                <button className="btn  bg-red-500 hover:bg-red-600 text-white font-bold">Close</button>
                            </form>
                        </div>
                    </div>
                    <Link to={`/dashboard/apply/${_id}`}>  <input type="submit" value='Next' className="btn -mt-12 bg-yellow-500 hover:bg-yellow-600 text-white font-bold absolute" /></Link>


                </form>
            </dialog>
        </div>
    );
};

export default ScholarshipDetails;