import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";


const ManageUsers = () => {

    const axiosSecure = useAxiosSecure()

    const { data: users = [],refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handleDelete = user =>{

        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete user...!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                              Swal.fire({
                                title: "Deleted!",
                                text: ` ${user?.name} has been deleted.`,
                                icon: "success"
                              });
                        }
                    })
            }
        });

    }


    return (
        <div className="my-10">
            <h3 className="text-lg md:text-2xl font-bold text-yellow-600 text-center my-5">Manage Users</h3>
            <div>
                <div className="overflow-x-auto shadow-xl bg-slate-200 m-5 min-h-screen rounded-md">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>User Role</th>
                                <th>Edit</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody className="">

                            {
                                users.map(user => <tr key={user._id} className="hover:shadow-md">
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user?.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user?.name}
                                    </td>
                                    <td>{user?.email}</td>
                                    <td>
                                        {user?.role}
                                    </td>
                                    <td>
                                        <button  className="btn btn-ghost text-lg   border-red-200 bg-orange-200"><FaEdit /> </button>
                                    </td>
                                    <td>
                                        <button onClick={()=>handleDelete(user)} className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><MdDelete /> </button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;