import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

 
const useApplications = () => {

    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const { data: applications = [], refetch, } = useQuery({
        queryKey: ['applies', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applies?email=${user?.email}`)
            return res.data
        }
    })
    return [applications]
};

export default useApplications;