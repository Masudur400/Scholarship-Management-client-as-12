import useReviews from "../../components/Hooks/useReviews";
import MyReviewsDesign from "./MyReviewsDesign";

 
const MyReviews = () => {

    const [myReviews, refetch] = useReviews()

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
                        myReviews.map((review, idx) =>  <MyReviewsDesign key={review._id} review={review} idx={idx} refetch={refetch}></MyReviewsDesign>)
                       }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyReviews;