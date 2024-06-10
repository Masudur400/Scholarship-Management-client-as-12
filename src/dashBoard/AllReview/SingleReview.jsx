import PropTypes from 'prop-types'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import Swal from 'sweetalert2';
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';



const SingleReview = ({ review ,refetch}) => {
    const {  reviewerName, reviewerEmail, universityName, ratingPoint, scholarshipName, universityImage, reviewerComments, reviewerImage, reviewDate } = review

    const parseRating = parseInt(ratingPoint)

    const date = new Date(reviewDate)
    const formattedDateOnly = date.toLocaleDateString()
    // const formattedDate = date.toLocaleString();

    const axiosSecure = useAxiosSecure()

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


    return (
        <div className="shadow-lg p-4 flex flex-col group border rounded-md">
            <div className="flex justify-center mb-3">
                <img className="w-80 h-56 group-hover:scale-105" src={universityImage} alt="" />
            </div>
            <div className="flex-grow space-y-2 font-bold">
                <p>Scholarship Name : {scholarshipName}</p>
                <p>University Name : {universityName}</p>
                <p>Reviewer Name : {reviewerName}</p>
                <p>Email : {reviewerEmail}</p>
                <p>Comment : {reviewerComments}</p>
                <div className='flex gap-2 items-center'>
                    <img className='w-12 h-12 rounded-full' src={reviewerImage} alt="" />
                    <div>
                        <p className='flex gap-2'>Rating : <Rating
                            style={{ maxWidth: 100 }}
                            value={parseRating}
                            readOnly
                        />
                        </p>
                        <p>review Date : {formattedDateOnly}</p>
                    </div>
                </div>

            </div>
            <p className="border-b-2 border-yellow-500 my-2"></p>
            <div className=" flex justify-center">
                <button onClick={()=>handleDelete(review)} className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md my-3 text-white font-bold">Delete</button>
            </div>
        </div>
    );
};

SingleReview.propTypes = {
    review: PropTypes.object,
    refetch: PropTypes.func
}

export default SingleReview;