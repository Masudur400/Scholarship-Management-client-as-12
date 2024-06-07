import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loading from "../Loading/Loading";


const UpdateProfile = () => {
    const { user, loading } = useAuth();
    console.log(user)
    const navigate = useNavigate();


    const handleUpdate = e => {
        e.preventDefault()
        const name = e.target.name.value
        const photo = e.target.photo.value

        updateProfile(user, {
            displayName: name,
            photoURL: photo
        })
        navigate('/profile')

    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <Helmet>
                <title>SM || UpdateProfile</title>
            </Helmet>
            <div className="w-4/5 lg:w-1/3 md:w-2/3 mx-auto bg-gray-100 shadow-xl p-5 rounded-lg my-20">
                <h2 className="text-2xl font-bold text-center text-yellow-600 my-3">Update Profile</h2>

                <form onSubmit={handleUpdate} >
                    <p>Name</p>
                    <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="name" defaultValue={user?.displayName} placeholder="Name" id="name" />

                    <p>Photo URL</p>
                    <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="photo" defaultValue={user?.photoURL} placeholder="Photo URL" id="photo" />

                    <input className=" w-full text-center px-4 py-2 rounded-md bg-yellow-600 hover:bg-yellow-700 border hover:border-black-500 text-white font-bold my-3" type="submit" value="Update" />
                </form>
            </div>

        </div>
    );
};

export default UpdateProfile;