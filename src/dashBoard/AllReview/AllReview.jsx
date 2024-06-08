import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import SingleReview from "./SingleReview";


const AllReview = () => {

    const axiosSecure = useAxiosSecure()

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('reviews')
            return res.data
        }
    })

    

    return (
        <div className="mt-5">
            <h3 className="text-lg md:text-2xl font-bold text-yellow-500 text-center my-3">all Reviews</h3>
            <div className="md:w-1/5 mx-auto border border-yellow-500 my-2"></div>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3">
            {
                reviews.map(review => <SingleReview key={review._id} review={review} refetch={refetch}></SingleReview>)
            }
            </div>
        </div>
    );
};

export default AllReview;