import React, { useState, useEffect, useContext } from 'react';
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import { FadeLoader } from 'react-spinners'; 
import { FaLocationDot } from "react-icons/fa6";
import { FaRunning } from "react-icons/fa";
import { MdSwitchAccount } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const MarathonDetails = () => {
    const marathon = useLoaderData();  
    const { user } = useContext(AuthContext);  
    const navigate = useNavigate(); 

    useEffect(() => {
        document.title = "Details | প্রতিদৌড়";
    }, []);

    const [marathonDetails, setMarathonDetails] = useState(null);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
    const [loading, setLoading] = useState(true);  

    const getData = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/marathon/${marathon._id}`, { withCredentials: true });
            setMarathonDetails(data);
            checkRegistrationStatus(data);
            setLoading(false); 
        } catch (error) {
            // console.error('Error fetching marathon details:', error);
            setLoading(false);  
        }
    };
    

    const checkRegistrationStatus = (data) => {
        const currentTime = Date.now(); 
        const registrationStartDate = new Date(data.registrationStartDate).getTime(); 
        const registrationEndDate = new Date(data.registrationEndDate).getTime(); 

        if (currentTime >= registrationStartDate && currentTime <= registrationEndDate) {
            setIsRegistrationOpen(true);
        } else {
            setIsRegistrationOpen(false);
        }
    };

    useEffect(() => {
        if (marathon && marathon._id) {
            getData();  
        }
    }, [marathon]);


    const handleRegisterClick = () => {
        if (isRegistrationOpen) {
            navigate(`/register-marathon/${marathonDetails._id}`);  // Pass the marathon ID in the URL
        }
    };
    

    const renderTime = ({ remainingTime }) => {
        if (remainingTime <= 0) {
            return <div className="text-xs font-semibold">Starts Now!</div>;
        }
        const days = Math.floor(remainingTime / (24 * 60 * 60));
        const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
        const seconds = remainingTime % 60;

        return (
            <div className="text-center text-xs font-semibold">
                <div>{`${days}d ${hours}h`}</div>
                <div>{`${minutes}m ${seconds}s`}</div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="absolute top-0 left-1/2 transform-translate-x-1/2 text-center my-4 md:my-6 z-50">
                <FadeLoader color="#228B22" loading={loading} size={50} />
            </div>
        );
    }

    return (
        <div className='max-w-screen-xl mx-auto my-10 px-4'>
            <h1 className='text-center mb-5 text-base md:text-3xl font-bold'>
                Details About {marathonDetails?.marathonTitle || 'Loading...'}
            </h1>
            <div className="border-y-8 bg-gray-50 md:border-y-8 rounded-xl border-[#228B22]">
                {marathonDetails ? (
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="image-section flex-shrink-0 w-full md:w-1/2 mb-4 md:mb-0">
                            <img src={marathonDetails.marathonImage} alt={marathonDetails.marathonTitle} className="w-full h-full object-cover "/>
                        </div>
                        <div className="text-section p-4 w-full md:w-1/2">
                            <h2 className="text-sm md:text-2xl font-semibold">{marathonDetails.marathonTitle}</h2>
                            <p className="text-xs text-justify md:text-base my-2">{marathonDetails.description}</p>
                            
                            <div className='flex flex-col md:flex-row items-start md:items-center justify-between'>

                                {/* details info */}
                                <div>
                                    <p className='text-xs md:text-base mb-1'><strong><FaLocationDot className='inline-block mr-1 text-[#228B22]'/>
                                    Location:</strong> {marathonDetails.location}</p>
                                    <p className='text-xs md:text-sm mb-1'><strong><FaRunning className='inline-block mr-1 text-[#228B22] text-lg'/>
                                    Running Distance:</strong> {marathonDetails.runningDistance}</p>
                                    <p className='text-xs md:text-sm mb-1'><strong><FaCalendarCheck className="inline-block md:text-lg mr-1 text-[#22438b]" />Registration Starts:</strong> {new Date(marathonDetails.registrationStartDate).toLocaleString()}</p>
                                    <p className='text-xs md:text-sm mb-1'><strong><FaCalendarTimes className="inline-block md:text-lg mr-1 text-[#8b2222]" />Registration Ends:</strong> {new Date(marathonDetails.registrationEndDate).toLocaleString()}</p>
                                    <p className='text-xs md:text-sm mb-1'><strong><MdSwitchAccount className='inline-block mr-1 text-[#228B22] text-lg'/>
                                    Total Registrations:</strong> {marathonDetails.totalRegistrationCount}</p>
                                </div>

                                {/* Countdown Timer */}
                                <div className="text-center flex flex-col items-center mt-4 md:mt-0">
                                    <h3 className="text-xs font-semibold mb-2">Time Until Marathon Starts</h3>
                                    <CountdownCircleTimer
                                        isPlaying
                                        duration={Math.floor((new Date(marathonDetails.marathonStartDate).getTime() - Date.now()) / 1000)}
                                        colors={[['#228B22', 0.33], ['#F7B801', 0.33], ['#A30000']]}
                                        size={100}
                                        strokeWidth={6}
                                        className="lg:w-24 md:w-20 sm:w-16 w-14"
                                    >
                                        {renderTime}
                                    </CountdownCircleTimer>
                                </div>
                            </div>

                            <Link to={`/register-marathon/${marathonDetails._id}`} disabled={!isRegistrationOpen} className={`btn w-full mt-4 py-2 px-4 ${isRegistrationOpen ? 'bg-[#228B22]  border-none hover:bg-[#1d771d] text-white' : 'bg-gray-500 text-gray-300'} rounded-lg`}>
                                {isRegistrationOpen ? 'Register Now' : 'Registration Closed'}
                            </Link>

                        </div>
                    </div>
                ) : (
                    <div className="absolute top-0 left-1/2 transform-translate-x-1/2 text-center my-4 md:my-6 z-50">
                        <FadeLoader color="#228B22" loading={loading} size={50} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarathonDetails;
