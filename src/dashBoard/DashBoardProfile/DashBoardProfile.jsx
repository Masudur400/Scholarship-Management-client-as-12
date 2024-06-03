import { Helmet } from "react-helmet";   
import useAuth from "../../components/Hooks/useAuth";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


 const DashBoardProfile = () => {
    const { user } =  useAuth() 

    const axiosSecure = useAxiosSecure()

    const { data: users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const logdinUser = users.find(logduser => logduser.email === user?.email)
    console.log(logdinUser)


    return (
        <div className="flex justify-center items-center min-h-screen">
            <Helmet>
                <title>SM || Profile</title>
            </Helmet>

            {
                user && <div data-aos="zoom-in-down" className="w-4/5 lg:w-1/3 md:w-2/3 mx-auto border  shadow-2xl p-5 rounded-lg my-20">

                    <div className="flex justify-center">
                        <img className="bg-red-100 w-52 h-52 rounded-full" referrerPolicy="no-referrer" src={logdinUser?.image} alt="" />
                    </div>

                    <h2 className="md:text-2xl text-lg my-5 font-bold text-center">Name : {logdinUser?.name}</h2>

                    <p className="text-center mb-5">Email: {logdinUser?.email || "User"}</p>
                    <p className="text-center mb-5">Role: {logdinUser?.role}</p>
                     

                    {/* <div className="flex justify-center">
                        <Link to='/updateProfile'><button className="px-4 py-2 rounded-md bg-yellow-600 hover:bg-yellow-700 border hover:border-black-500 text-white font-bold">Update Profile</button></Link>
                    </div> */}

                </div>
            }

        </div>
    );
 };
 
 export default DashBoardProfile;