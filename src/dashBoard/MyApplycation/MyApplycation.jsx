import MyApplicationDesign from "./MyApplicationDesign";
import useApplications from "../../components/Hooks/useApplications";


const MyApplycation = () => { 

    const [applications] = useApplications() 
    

    return (
        <div className="md:px-6 m-5">
            <h3 className="text-lg md:text-2xl font-bold text-yellow-500 text-center my-3">My Applications</h3>
            <div className="md:w-1/5 mx-auto border border-yellow-500 my-2"></div>
            <div className="overflow-x-auto min-h-screen">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr>

                            <td></td>
                            <td>universityName</td>
                            <td>university country & city</td> 
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