
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../components/Hooks/useAuth";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import MyApplicationDesign from "./MyApplicationDesign";


const MyApplycation = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: applications = [], refetch, } = useQuery({
        queryKey: ['applies', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applies?email=${user?.email}`)
            return res.data
        }
    })

    return (
        <div className="px-6">
            <div className="overflow-x-auto">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr>

                            <td></td>
                            <td>universityName</td>
                            <td>university country & city</td>
                            <td>Application Feedback </td>
                            <td>subject & degree</td>
                            <td>application fees & charge</td>
                            <td>Application Status</td>
                            <td>Action</td> 
                        </tr>
                    </thead>
                    <tbody>
                        
                       {
                        applications.map((application, idx) => <MyApplicationDesign key={application._id} application={application} idx={idx}></MyApplicationDesign>)
                       }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplycation;