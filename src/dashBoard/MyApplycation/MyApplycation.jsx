 
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../components/Hooks/useAuth";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure"; 

 
const MyApplycation = () => {

    const {user}=useAuth()
    const axiosSecure = useAxiosSecure() 

    const { data: applications = [] ,refetch,} = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applies?email=${user?.email}`)
            return res.data
        }
    }) 

    return (
        <div>
 
        </div>
    );
};

export default MyApplycation;