import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoTwitter, IoLogoYoutube } from "react-icons/io";

const Footer = () => {
    return (
        <div className="border-t-2 border-yellow-600">
            <footer className="footer p-10 container  mx-auto">
                <nav>
                    {/* <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a> */}
                </nav>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        <a href="" className="text-3xl  text-sky-700"> <IoLogoTwitter></IoLogoTwitter></a>
                        <a href=""  className="text-3xl text-red-600"> <IoLogoYoutube></IoLogoYoutube></a>
                        <a href="" className="text-3xl text-blue-600"> <FaFacebookSquare></FaFacebookSquare></a>
                    </div>
                </nav>
                <nav>
                    <h6 className="footer-title">Contact Us</h6>
                    <p className="font-bold">Email : md8004210@gmail.com</p>
                    <p className="font-bold">WhatsApp : 01905711766</p> 
                </nav>
            </footer>
        </div>
    );
};

export default Footer;