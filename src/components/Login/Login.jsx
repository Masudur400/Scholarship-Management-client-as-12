import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";

 
const Login = () => {
    const { login, googleLogin } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const axiosPublic = useAxiosPublic()

    const navigate = useNavigate()
    const location = useLocation();

    const handleLogin = e => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const email = form.get('email')
        const password = form.get('password')
        console.log(email, password)

        login(email, password)
            .then(result => {
                console.log(result.user)
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
                console.error(error)
            })
    }


    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result)

                const userInfo={
                    email:result.user?.email,
                    name:result.user?.displayName,
                    role:'user',
                    image:result.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
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
                <title>SM || Login</title>
            </Helmet>
            <div data-aos="zoom-in-down" className="w-4/5 lg:w-1/3 md:w-2/3 mx-auto  border shadow-xl p-5 rounded-lg my-20">
                <h2 className="md:text-2xl font-bold text-center my-3 animate__animated animate__rubberBand text-yellow-600">LogIn Your Account</h2>
                <form onSubmit={handleLogin}>


                    <p>Email</p>
                    <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="email" name="email" placeholder="Email" id="email" required />

                    <p>Password</p>
                    <div className="relative">
                        <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" required />
                        <span className="absolute top-1/4 right-3" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}
                        </span>
                    </div>

                    <input className=" w-full px-4 py-2 text-center md:text-lg rounded-md bg-yellow-600 hover:bg-yellow-700 border hover:border-black text-white font-bold my-3" type="submit" value="Login" />
                </form>

                <p>Do not have an account ? <Link to='/register' className="text-red-500 font-bold underline">please Register</Link></p>

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

export default Login;