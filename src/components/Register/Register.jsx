import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

 

const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi =`https://api.imgbb.com/1/upload?key=${imageHostingKey}`

const Register = () => {

    const { createUser, googleLogin } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()
    const location = useLocation();

    const handleLogin = e => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const email = form.get('email')
        const password = form.get('password')
        const name = form.get('name')
        const image = form.get('image')
        console.log(email, password, name,image)

        // createUser(email, password)
        //     .then(result => {
        //         console.log(result.user)
        //         if (result.user) {
        //             Swal.fire({
        //                 title: "Success!",
        //                 text: "Login successfully!",
        //                 icon: "success"
        //             });
        //         }

        //         navigate(location?.state ? location.state : '/')
        //     })
        //     .catch(error => {
        //         console.error(error)
        //     })
    }

    
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result)
                if (result.user) {
                    Swal.fire({
                        title: "Success!",
                        text: "Login successfully!",
                        icon: "success"
                    });
                }
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="min-h-screen"> 
            <Helmet>
                <title>SM || Register</title>
            </Helmet>
            <div data-aos="zoom-in-down" className="w-4/5 lg:w-1/3 md:w-2/3 mx-auto  border shadow-xl p-5 rounded-lg my-20">
                <h2 className="md:text-2xl font-bold text-center my-3 animate__animated animate__rubberBand text-yellow-600">LogIn Your Account</h2>
                <form onSubmit={handleLogin}>


                    <p>Name</p>
                    <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="name" placeholder="Name" id="name" required />
                    <p>Email</p>
                    <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="email" name="email" placeholder="Email" id="email" required />

                    <p>Password</p>
                    <div className="relative">
                        <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" required />
                        <span className="absolute top-1/4 right-3" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}
                        </span>
                    </div>
                    <p>Image</p>
                    <input className="border-2 rounded-md w-full mb-2" type="file" name="image" id="" />

                    <input className=" w-full px-4 py-2 text-center md:text-lg rounded-md bg-yellow-600 hover:bg-yellow-700 border hover:border-black text-white font-bold my-3" type="submit" value="Login" />
                </form>

                <p>Already have an account ? <Link to='/login' className="text-red-500 font-bold underline">please Login</Link></p>

                <div className="divider my-5"></div>
                <div className="mb-t">
                    <div>
                        <button onClick={handleGoogleLogin} className=" text-2xl bg-gray-200 p-3 rounded-2xl flex gap-4 items-center w-full justify-center font-bold"><FaGoogle></FaGoogle>Google</button>
                         
                    </div>
                     
                </div>

            </div>
        </div>
    );
};

export default Register;