import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";


const ManageUsers = () => {

    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const { data: users = [], refetch, isPending } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })


    const handleDelete = user => {

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

    const [currentUser, setCurrentUser] = useState()


    const handleUpdate = user => {
        setCurrentUser(user)
    }


    const handleUpdateRole = async e => {
        e.preventDefault()
        const currentRole = e.target.role.value

        const data = { image: currentUser.image, email: currentUser.email, name: currentUser.name, role: currentRole }

        const res = await axiosSecure.patch(`/users/${currentUser?._id}`, data)
        if (res.data.modifiedCount > 0) {
            refetch()
            Swal.fire({
                title: "success !",
                text: `role update successfully !`,
                icon: "success"
            });
            navigate('/dashboard/users')
            document.getElementById("my_modal_5").close();
        }
    }

    if (isPending) {
        return <Loading></Loading>
    }


    return (
        <div className="my-10">
            <Helmet>
                <title>SM || Manage Users</title>
            </Helmet>
            <h3 className="text-lg md:text-2xl font-bold text-yellow-500 text-center my-5">Manage Users</h3>
            <div className="md:w-1/5 mx-auto border border-yellow-500 my-2"></div>
            <div>
                <div className="overflow-x-auto shadow-2xl  m-5 min-h-screen rounded-md">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
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

                                Array.isArray(users) && users.length > 0 ?
                                    users.map((user, idx) => <tr key={user._id} className="hover:shadow-md">
                                        <td>
                                            {idx + 1}
                                        </td>
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
                                            {/* <button onClick={()=>handleUpdateRole(user)} className="btn btn-ghost text-lg   border-red-200 bg-orange-200"><FaEdit /> </button> */}

                                            {user?.role === 'admin' ? 'admin' :
                                                <div onClick={() => handleUpdate(user)}>
                                                    <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn btn-ghost text-lg border-red-200 bg-orange-200"><FaEdit /></button>
                                                </div>}
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(user)} className="btn btn-ghost text-lg text-red-500 border-red-200 bg-orange-200"><MdDelete /> </button>
                                        </td>
                                    </tr>) : ''
                            }


                        </tbody>
                    </table>
                </div>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <form onSubmit={handleUpdateRole} className="modal-box">
                        <div >
                            <select name='role' className="border-2 rounded-md w-full px-4 py-2 mb-2">
                                <option disabled selected>Select One</option>
                                <option value="admin">admin</option>
                                <option value="moderator">moderator</option>
                                <option value="user">user</option>
                            </select>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in div, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                        <input type="submit" value='confirm' className="btn -mt-12 absolute" />
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default ManageUsers;