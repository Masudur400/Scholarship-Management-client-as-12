import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import { TbListDetails } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";


const ManageScholarship = () => {

    const axiosSecure = useAxiosSecure()

    const { data: scholarships = [], refetch } = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axiosSecure.get('/scholarships')
            return (res.data)
        }
    })
   

    return (
        <div> 
            <div>
                <div className="overflow-x-auto shadow-2xl  m-5 min-h-screen rounded-md">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Scholarship name</th>
                                <th>University Name</th>
                                <th>Subject Category</th>
                                <th>Applied Degree</th>
                                <th>Application Fees</th>
                                <th>details</th>
                                <th>edit</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody className="">

                            {
                                scholarships.map(scholarship => <tr key={scholarship._id} className="hover:shadow-md">
                                    <td>{scholarship.scholarshipName}</td>
                                    <td>{scholarship.universityName}</td>
                                    <td>{scholarship.subjectCategory}</td>
                                    <td>{scholarship.degree}</td>
                                    <td>{scholarship.applicationFees}$</td>
                                    <td>
                                        <Link to={`/scholarship/${scholarship._id}`}><button className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><TbListDetails></TbListDetails> </button></Link></td>

                                    <td> <button className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><FaEdit /> </button> </td>
                                    <td> <button className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><MdOutlineDeleteForever /> </button> </td>
                                </tr>)
                            } 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageScholarship;