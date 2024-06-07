import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

 
const useApplications = () => {

    const axiosSecure = useAxiosSecure()
    const {user, loading} = useAuth()

    const { data: applications = [], refetch, isPending} = useQuery({
        queryKey: ['applies', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applies?email=${user?.email}`)
            return res.data
        }
    })
    return [applications,refetch, isPending,loading]
};

export default useApplications;