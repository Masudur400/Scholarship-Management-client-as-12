import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

 
const useModerator = () => { 

    const {user, loading} = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const {data : isModerator, isPending : isModeratorLoading} = useQuery({
        queryKey : [user?.email, "isModerator"],
        enabled : !loading,
        queryFn : async() => {
            const res = await axiosSecure.get(`/users/moderator/${user?.email}`);
             
            return res?.data?.moderator
        }
    }) 



    return [isModerator, isModeratorLoading]

};

export default useModerator;