import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import { TbListDetails } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";


const ManageScholarship = () => {

    const axiosSecure = useAxiosSecure()

    const { data: scholarships = [], refetch, isPending } = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axiosSecure.get('/scholarships')
            return (res.data)
        }
    })

    const handleDelete = scholarship =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete scholarship...!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/scholarships/${scholarship?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: ` ${scholarship?.scholarshipName} has been deleted.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    if(isPending){
        return <Loading></Loading>
    }
   

    return (
        <div> 
            <h3 className="text-lg md:text-2xl font-bold text-yellow-500 text-center my-5">Manage Scholarship</h3>
            <div className="md:w-1/5 mx-auto border border-yellow-500 my-2"></div>
            <div>
                <div className="overflow-x-auto shadow-2xl  m-5 min-h-screen rounded-md">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
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
                                scholarships.map((scholarship, idx) => <tr key={scholarship._id} className="hover:shadow-md">
                                    <td>{idx+1}</td>
                                    <td>{scholarship.scholarshipName}</td>
                                    <td>{scholarship.universityName}</td>
                                    <td>{scholarship.subjectCategory}</td>
                                    <td>{scholarship.degree}</td>
                                    <td>{scholarship.applicationFees}$</td>
                                    <td>
                                        <Link to={`/dashboard/manageScholarshipDetails/${scholarship._id}`}><button className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><TbListDetails></TbListDetails> </button></Link></td>

                                    <td> <Link to={`/dashboard/update/${scholarship._id}`}><button className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><FaEdit /> </button></Link> </td>

                                    <td> <button onClick={()=>handleDelete(scholarship)} className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><MdOutlineDeleteForever /> </button> </td>
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