import React, { useState, useEffect, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import alienAnimation from "../../assets/spaceship.json";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import { MdAddAPhoto, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

const Register = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { createUser, googlePopup, user, loading } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
            document.title = "Register | প্রতিদৌড়";
          }, []);

    useEffect(() => {
        AOS.init();
        if (user) {
            navigate("/");
        }
    }, [navigate, user]);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await googlePopup(googleProvider);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,
                { email: result?.user?.email },
                { withCredentials: true }
            );
            toast.success("Registration Successful!", {
                position: "top-center",
            });

            navigate(location?.state ? location.state : "/");
        } catch (error) {
            // console.error(error);
            toast.error("Registration Failed!", {
                position: "top-center",
            });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photo.value;
        const password = form.password.value;
    
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const lengthRequirement = password.length >= 6;
    
        if (!uppercaseRegex.test(password)) {
            toast.error("Password must contain at least one uppercase letter.", {
                position: "top-center",
            });
            return;
        }
    
        if (!lowercaseRegex.test(password)) {
            toast.error("Password must contain at least one lowercase letter.", {
                position: "top-center",
            });
            return;
        }
    
        if (!lengthRequirement) {
            toast.error("Password must be at least 6 characters long.", {
                position: "top-center",
            });
            return;
        }
    
        try {
            const result = await createUser(email, password, name, photoURL);
            
            if (result) {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_URL}/jwt`,
                    { email: email },
                    { withCredentials: true }
                );
    
                localStorage.setItem("jwtToken", data.token);
    
                toast.success("Registration Successful!", {
                    position: "top-center",
                });
    
                navigate(location?.state ? location.state : "/");
            }
        } catch (error) {
            // console.error(error);
            toast.error("Registration Failed!", {
                position: "top-center",
            });
        }
    };
    

    if (user || loading) return null;

    return (
        <div
            className="relative min-h-screen bg-cover bg-center overflow-auto"
            style={{
                backgroundImage:
                    "url('https://i.ibb.co.com/WPpSmBw/9508803-26807.jpg')",
            }}
        >
            <ToastContainer />
            <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>

            <div
                className="flex flex-col md:flex-row justify-between items-center max-w-screen-lg mx-auto px-4 md:px-0 z-10 relative min-h-screen"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                <div
                    className="text-left text-white space-y-4 px-4 md:px-6 relative z-10 mb-8 md:mb-0"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    <div className="absolute w-32 right-0 opacity-70 md:w-64 md:-left-10 md:-top-60">
                        <Lottie animationData={alienAnimation}></Lottie>
                    </div>
                    <h1 className="text-3xl mt-3 md:mt-0 md:text-5xl font-bold text-white">
                        <span className="text-green-500">প্রতি</span>
                        <span className="text-red-500">দৌড়</span>
                    </h1>
                    <p className="text-sm md:text-xl font-bold text-green-400">
                        Race towards success, together we run.
                    </p>
                    <p className="text-xs md:text-base text-white text-justify">
                        <span className="text-xl text-red-500 font-bold">"</span>ProtiDour is a modern marathon management platform that easily connects event organizers and participants, offering seamless event creation, registration, and tracking.
                        <span className="text-xl text-red-500 font-bold">"</span>
                    </p>
                </div>

                <div className="w-full relative border-y-8 border-blue-600 max-w-md p-8 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl shadow-lg z-10 mb-10">
                    <h2 className="text-3xl font-bold text-center text-white mb-2">
                        Create an Account
                    </h2>
                    <p className="text-white text-center text-xs md:text-sm">
                        Join us in making a difference!
                    </p>

                    <form className="space-y-4" onSubmit={handleRegister}>
                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <FaUserCircle className="ml-3 text-gray-600 text-2xl" />
                            </span>
                            <input
                                type="text"
                                name="name"
                                className="block text-sm w-full py-3 text-gray-700 bg-white border rounded-lg px-11"
                                placeholder="Enter Your Name"
                                required
                            />
                        </div>

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <MdEmail className="ml-3 text-gray-600 text-2xl" />
                            </span>
                            <input
                                type="email"
                                name="email"
                                className="block text-sm w-full py-3 text-gray-700 bg-white border rounded-lg px-11"
                                placeholder="Enter Your Email"
                                required
                            />
                        </div>

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <MdAddAPhoto className="ml-3 text-gray-600 text-2xl" />
                            </span>
                            <input
                                type="text"
                                name="photo"
                                className="block text-sm w-full py-3 text-gray-700 bg-white border rounded-lg px-11"
                                placeholder="Enter Photo URL"
                            />
                        </div>

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <RiLockPasswordFill className="ml-3 text-gray-600 text-2xl" />
                            </span>
                            <span
                                className="absolute top-4 right-4"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? (
                                    <FaEye className="text-gray-700" />
                                ) : (
                                    <FaEyeSlash className="text-gray-700" />
                                )}
                            </span>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                className="block text-sm w-full px-10 py-3 text-gray-700 bg-white border rounded-lg"
                                placeholder="Enter New Password"
                                required
                            />
                        </div>

                        <button className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-[#1B1B1D] via-[#272730] to-[#342b6e] hover:from-[#1B1B1D] hover:via-[#1a1148] transition duration-300 hover:to-[#30228b] ease-in-out btn border-none rounded-md">
                            Register
                        </button>
                    </form>

                    <div className="flex items-center justify-center px-1 mt-2 pb-3">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <div className="mx-4 text-gray-500">Or</div>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>

                    <button
                        type="button"
                        className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-[#0334c8] via-[#023d84] to-[#07881c] hover:from-[#4d8823] hover:via-[#113e48] transition duration-300 hover:to-[#228B22] ease-in-out btn border-none rounded-md"
                        onClick={handleGoogleSignIn}
                    >
                        <FcGoogle className="text-2xl" /> Register with Google
                    </button>

                    <p className="text-sm text-center text-white mt-1">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-white hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
