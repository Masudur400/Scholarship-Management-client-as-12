import MyApplicationDesign from "./MyApplicationDesign";
import useApplications from "../../components/Hooks/useApplications";


const MyApplycation = () => { 

    const [applications] = useApplications() 
    

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