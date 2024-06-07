import axios from 'axios';
import PropTypes from 'prop-types' 
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';



const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const MyReviewsDesign = ({review, idx, refetch}) => {

    const axiosSecure = useAxiosSecure()

    const {_id,reviewerName,reviewerEmail,universityName,ratingPoint,scholarshipName,universityImage,reviewerComments,reviewerImage,reviewDate} = review

    const date = new Date(reviewDate)
    const formattedDateOnly = date.toLocaleDateString()
    const formattedDate = date.toLocaleString();

    const handleEditReview = async(e) =>{
        e.preventDefault()

        const form = new FormData(e.currentTarget);
        const reviewerName = form.get('reviewerName')
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

            const data = {reviewerName,ratingPoint,reviewerComments, reviewerImage:imageUrl || reviewerImage} 

            
            const res = await axiosSecure.patch(`/reviews/${_id}`, data)
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


    const handleDelete = review =>{
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


    return (
           <>

        <tr className='hover:shadow-md '>
            <td> {idx + 1} </td>
            <td>  <img className='h-12 w-12 rounded-md' src={universityImage} alt="" /> </td>
            <td> {reviewerName} </td>
            <td> {scholarshipName} </td>
            <td> {universityName} </td>
            <td> {reviewerComments}</td> 
            <td className='text-center'> {ratingPoint}</td> 
            <td className='text-center'> {formattedDateOnly}</td> 
             
             
            <td className='justify-between flex  gap-2'>
           {/* <div className="tooltip tooltip-bottom"  data-tip="Details">
           <Link to={``}><button className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><TbListDetails></TbListDetails> </button></Link>
           </div> */}

           <div className="tooltip tooltip-top"  data-tip="Edit">
           <Link><button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><FaEdit /> </button></Link>
           </div>

            <div className="tooltip tooltip-top"  data-tip="Delete">
            <button onClick={()=>handleDelete(review)} className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><MdOutlineDeleteForever /> </button> 
            </div>
            </td>
        </tr>
        {/* modal  */}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form onSubmit={handleEditReview} className="modal-box">
                    <div >
                        <h2 className="font-bold text-yellow-500 text-center">Review</h2>
                        <div>
                            <p>Reviewer name</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" defaultValue={reviewerName} name="reviewerName" placeholder="Reviewer name" id="" required />
                        </div>
                        <div>
                            <p>Rating point</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" defaultValue={ratingPoint} name="ratingPoint" placeholder="Rating point" id="" required />
                        </div>
                        {/* {ratingPointError && <p className="text-red-500">{ratingPointError}</p>} */}
                        <div>
                            <p>Reviewer image</p>
                            <input type="file" name="image" id="image" className="border-2 rounded-md w-full px-4 py-2 mb-2"   />
                        </div>
                        <div>
                            <p>Reviewer Comments</p>
                            <textarea name="reviewerComments" defaultValue={reviewerComments} placeholder="Reviewer Comments" className="textarea textarea-bordered textarea-xs w-full border-2 rounded-md " required></textarea>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in div, it will close the modal */}
                                <button className="btn  bg-red-500 hover:bg-red-600 text-white font-bold">Close</button>
                            </form>
                        </div>
                    </div>
                    {/* <Link  to={`/dashboard/apply/${_id}`}>  */}
                     <input type="submit" value='Next' className="btn -mt-12 bg-yellow-500 hover:bg-yellow-600 text-white font-bold absolute" />
                     {/* </Link> */} 
                </form>
            </dialog>
    </>
    );
};

MyReviewsDesign.propTypes={
    review:PropTypes.object,
    idx:PropTypes.num,
    refetch:PropTypes.func
}

export default MyReviewsDesign;