import { FaEdit } from "react-icons/fa";
import useReviews from "../../components/Hooks/useReviews";
import Loading from "../../components/Loading/Loading";
import MyReviewsDesign from "./MyReviewsDesign";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import { useState } from "react";
import axios from "axios";



const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const MyReviews = () => {

    const axiosSecure = useAxiosSecure()
    const [myReviews, refetch, loading, isPending] = useReviews()
    const [currentReview, setCurrentReview] = useState()

    const handleReviewData = review => {
        setCurrentReview(review)
    }


    const date = new Date( currentReview?.reviewDate)
    
    const formattedDateOnly = date.toLocaleDateString()
    const formattedDate = date.toLocaleString();

    const handleEditReview = async(e) =>{
        e.preventDefault() 
        

        const form = new FormData(e.currentTarget);
        const reviewerName = form.get('reviewerName')
        console.log(reviewerName)
        const ratingPoint = form.get('ratingPoint')
        const reviewerComments = form.get('reviewerComments')
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

            const data = {reviewerName,ratingPoint,reviewerComments, reviewerImage:imageUrl || currentReview?.reviewerImage} 

            
            const res = await axiosSecure.patch(`/reviews/${currentReview?._id}`, data)
            if (res.data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    title: "success !",
                    text: `edit review successfully !`,
                    icon: "success"
                });
                 
            }

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        } 
        document.getElementById("my_modal_5").close(); 
    }


    const handleDelete = review => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete review...!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/reviews/${review?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: ` review has been deleted.`,
                                icon: "success"
                            });

                        }
                    })
            }
        });
    }

    if (loading || isPending) {
        return <Loading></Loading>
    }

    return (
        <div className="md:px-6 m-5">
            <h3 className="text-lg md:text-2xl font-bold text-yellow-500 text-center my-3">My Reviews</h3>
            <div className="md:w-1/5 mx-auto border border-yellow-500 my-2"></div>
            <div className="overflow-x-auto min-h-screen">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr>

                            <td>#</td>
                            <td>University Image</td>
                            <td>Reviewer Name</td>
                            <td>Scholarship name</td>
                            <td>university name</td>
                            <td>Review comments </td>
                            <td>Rating </td>
                            <td>Review date</td>
                            <td className="text-center">Action</td>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            myReviews.map((review, idx) => <tr key={review._id} className='hover:shadow-md '>
                                <td> {idx + 1} </td>
                                <td>  <img className='h-12 w-12 rounded-md' src={review?.universityImage} alt="" /> </td>
                                <td> {review?.reviewerName} </td>
                                <td> {review?.scholarshipName} </td>
                                <td> {review?.universityName} </td>
                                <td> {review?.reviewerComments}</td>
                                <td className='text-center'> {review?.ratingPoint}</td>
                                <td className='text-center'> {new Date(review?.reviewDate)?.toLocaleDateString()}</td>


                                <td className='justify-between flex  gap-2'>

                                    <div onClick={() =>handleReviewData(review)} className="tooltip tooltip-top" data-tip="Edit">
                                        <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><FaEdit /> </button>
                                    </div>

                                    <div className="tooltip tooltip-top" data-tip="Delete">
                                        <button
                                            onClick={() => handleDelete(review)}
                                            className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><MdOutlineDeleteForever /> </button>
                                    </div>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form
                    onSubmit={handleEditReview}
                    className="modal-box">
                    <div >
                        <h2 className="font-bold text-yellow-500 text-center">Review</h2>
                        <div>
                            <p>Reviewer name</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" defaultValue={currentReview?.reviewerName} name="reviewerName" placeholder="Reviewer name" id="" />
                        </div>
                        <div>
                            <p>Rating point</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" defaultValue={currentReview?.ratingPoint} name="ratingPoint" placeholder="Rating point" id="" />
                        </div>
                        {/* {ratingPointError && <p className="text-red-500">{ratingPointError}</p>} */}
                        <div>
                            <p>Reviewer image</p>
                            <input type="file" name="image" id="image" className="border-2 rounded-md w-full px-4 py-2 mb-2" />
                        </div>
                        <div>
                            <p>Reviewer Comments</p>
                            <textarea name="reviewerComments" defaultValue={currentReview?.reviewerComments} placeholder="Reviewer Comments" className="textarea textarea-bordered textarea-xs w-full border-2 rounded-md "  ></textarea>
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
        </div>
    );
};

export default MyReviews;