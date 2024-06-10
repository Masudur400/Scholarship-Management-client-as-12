import { Link,   useParams } from "react-router-dom"; 
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";

 
const ManageScholarshipDetails = () => {  
     
    const axiosSecure = useAxiosSecure()

    const {id} = useParams()

    const { data: scholarShips={}, isPending} = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships/${id}`) 
            return res.data
        }
    }) 
    

    const {postDate, applicationDeadline, scholarshipName, universityCity, universityCountry, universityName, universityWorldRank, subjectCategory,  scholarshipCategory, degree, applicationFees, serviceCharge, image} = scholarShips 

    if(isPending){
        return <Loading></Loading>
    }
     
    return (
        <div className="shadow-lg p-4 md:flex gap-6  ">
        <div className="flex justify-center mb-3">
           <img className="md:w-[600px] md:h-[425px]" src={image} alt="" />
        </div>
        <div className="space-y-2 flex-1">
           <p><span className="font-bold">Scholarship Name :</span> {scholarshipName}</p>
           <p><span className="font-bold">scholarship Category :</span> {scholarshipCategory}</p>
           <p><span className="font-bold">University Name :</span> {universityName}</p>
           <p><span className="font-bold">University Country :</span> {universityCountry}</p>
           <p><span className="font-bold">University City :</span> {universityCity}</p>
           <p><span className="font-bold">Subject Category :</span> {subjectCategory}</p> 
           <p><span className="font-bold">Degree :</span> {degree}</p>
           <p><span className="font-bold">University World Rank :</span> {universityWorldRank} number in the world</p>
           <div className=" ">
               <p><span className="font-bold">PostDate :</span> {postDate}</p>
               <p><span className="font-bold">Deadline :</span> {applicationDeadline}</p>
           </div>
           <div  className=" ">
            <p><span className="font-bold">Application Fees :</span> {applicationFees}$ </p>
            <p><span className="font-bold">Service Charge :</span> {serviceCharge}$ </p>
           </div>
           <p className="border-b-2 border-yellow-500 my-2"></p>
            
       <Link to={-1}> <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md my-3 text-white font-bold">Back</button></Link>
         
        </div>
        
   </div>
    );
};

export default ManageScholarshipDetails;