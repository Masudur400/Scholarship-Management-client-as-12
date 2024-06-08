import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import AllApplicationRow from "./AllApplicationRow";

 
const AllAppliedScholarship = () => {

    const axiosSecure = useAxiosSecure()
    const {data: allApplies = [], refetch} = useQuery({
        queryKey:['applies'],
        queryFn:async ()=>{
            const res = await axiosSecure.get('/applies')
            return res.data
        }
    })

    return (
        <div className="md:px-6 m-5">
            <h3 className="text-lg md:text-2xl font-bold text-yellow-500 text-center my-3">All Applied Scholarship</h3>
            <div className="md:w-1/5 mx-auto border border-yellow-500 my-2"></div>
            <div className="overflow-x-auto min-h-screen">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr>

                            <td>#</td>
                            <td>UniversityName</td>
                            <td>University country & city</td> 
                            <td>Subject & degree</td>
                            <td>Application fees & charge</td> 
                            <td>FeedBack</td> 
                            <td>Application Status</td>
                            <td className="text-center">Action</td> 
                        </tr>
                    </thead>
                    <tbody>
                        
                       {
                        allApplies.map((apply, idx) =>  <AllApplicationRow key={apply._id} apply={apply} idx={idx} refetch={refetch}></AllApplicationRow>)
                       }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllAppliedScholarship;