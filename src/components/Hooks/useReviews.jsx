import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

 
const useReviews = () => {

    const axiosSecure = useAxiosSecure()
    const {user, loading} = useAuth()

    const { data: myReviews = [], refetch, isPending } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/ree?email=${user?.email}`)
            return res.data
        }
    }) 
    return [myReviews, refetch, isPending, loading]
};

export default useReviews;