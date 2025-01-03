import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';  

const RegisterForm = () => {
    const { user } = useContext(AuthContext); 
    const { id } = useParams(); 
    const [marathonDetails, setMarathonDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        addressInfo: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
          document.title = "Marathon Register | প্রতিদৌড়";
        }, []);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const getMarathonDetails = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/marathon/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                });
                setMarathonDetails(data);
                setLoading(false);
            } catch (error) {
                // console.error('Error fetching marathon details:', error);
                setLoading(false);
            }
        };

        getMarathonDetails();
    }, [id, user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registrationData = {
            marathonId: id,
            userEmail: user.email,
            marathonTitle: marathonDetails.marathonTitle,
            startDate: marathonDetails.startDate,
            ...formData
        };

        try {
            const token = localStorage.getItem('authToken');
            await axios.post(`${import.meta.env.VITE_API_URL}/registration`, registrationData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });
            
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'You have successfully registered for the marathon.',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/my-apply');
            });
        } catch (error) {
            // console.error('Error registering:', error);
        }
    };

    if (loading) {
        return <p>Loading marathon details...</p>;
    }

    return (
        <div className="py-7 bg-cover bg-center relative" style={{ backgroundImage: "url('https://i.ibb.co.com/PmgcBDK/ai-generated-8011395-1920.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 relative z-10 px-4">
                <div className="flex-1 text-white p-5">
                    <h1 className="text-2xl text-[#37d337] md:text-4xl font-bold mb-6">
                        Register for {marathonDetails.marathonTitle}
                    </h1>
                    <p className="text-sm text-justify md:text-lg">
                        Complete your registration to join this exciting marathon event. Fill out the form below to confirm your participation.
                    </p>
                </div>
                <div className="flex-1 bg-gray-400 border-y-8 bg-opacity-30 backdrop-blur-sm rounded-xl border-[#228B22] shadow-lg p-6 md:max-w-lg w-full">
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-800 dark:text-white">Marathon Title</span>
                            </label>
                            <input
                                type="text"
                                value={marathonDetails.marathonTitle}
                                readOnly
                                className="input dark:bg-gray-900 text-gray-400 input-bordered w-full"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-800 dark:text-white">Email</span>
                            </label>
                            <input
                                type="email"
                                name="userEmail"
                                value={user?.email || ''}
                                readOnly
                                className="input dark:bg-gray-900 text-gray-400 input-bordered w-full"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-800 dark:text-white">First Name</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                required
                                className="input dark:bg-gray-900 text-gray-400 input-bordered w-full"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-800 dark:text-white">Last Name</span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                required
                                className="input dark:bg-gray-900 text-gray-400 input-bordered w-full"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-800 dark:text-white">Address</span>
                            </label>
                            <textarea
                                name="addressInfo"
                                value={formData.addressInfo}
                                onChange={handleChange}
                                placeholder="Address"
                                required
                                className="textarea dark:bg-gray-900 text-gray-400 textarea-bordered w-full"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-800 dark:text-white">Start Date</span>
                            </label>
                            <input
                                type="text"
                                value={marathonDetails.marathonStartDate}
                                readOnly
                                className="input dark:bg-gray-900 text-gray-400 input-bordered w-full"
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-[#1a001e] via-[#6a1b6d] to-[#342b6e] hover:from-[#1b6d1b] hover:via-[#1a1148] hover:to-[#30228b] transition duration-300 ease-in-out border-none rounded-md">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
