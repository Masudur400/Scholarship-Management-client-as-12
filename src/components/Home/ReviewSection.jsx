import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Single from "./Single"; 

 
const ReviewSection = () => {

    const axiosSecure = useAxiosSecure()

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews')
            return res.data
        }
    })

    const sortedReviews = reviews?.slice(0,6)

    return (
        <div> 
            <h3 className="text-lg md:text-2xl font-bold text-yellow-500 text-center mt-10">Students Rating</h3>
             <p className="border-b-2 border-yellow-500 my-2 md:w-1/3 mx-auto"></p>
             <div className="md:w-2/3 mx-auto text-center">
                <p>Students comment on whether the application process was straightforward or complicated. Students comment on whether the application process was straightforward or complicated.</p>
             </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 my-10 gap-3">
            {
                Array.isArray(sortedReviews) && sortedReviews.length > 0 ? 
                sortedReviews.map(review => <Single key={review._id} review ={review}></Single>)
                :''
            }
        </div>
         </div>
    );
};

export default ReviewSection;