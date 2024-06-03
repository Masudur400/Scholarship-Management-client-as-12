import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hooks/useAxiosSecure"; 
import { useQuery } from "@tanstack/react-query";
import Scholarship from "./Scholarship";

 
const AllScolarShip = () => {

    const axiosSecure = useAxiosSecure()

    const {data : scholarships = []} = useQuery({
        queryKey:['scholarships'],
        queryFn:async () =>{
            const res = await axiosSecure.get('/scholarships')
            return res.data
        }
    }) 



    return (
        <div className="my-10">
            <Helmet>
                <title>SM || Home</title>
            </Helmet>
            <h3 className="text-lg md:text-2xl font-bold text-yellow-500 text-center my-5">All Scholarship</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    scholarships?.map(scholarship => <Scholarship key={scholarship._id} scholarship={scholarship}></Scholarship>)
                }
            </div>
             
        </div>
    );
};

export default AllScolarShip;