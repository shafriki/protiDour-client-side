import React, { useEffect, useState } from 'react';
import marathonsData from '../../public/upcoming.json';
import { FaLocationDot } from "react-icons/fa6";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { Typewriter } from 'react-simple-typewriter';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const UpcomingMarathons = () => {
    const [randomMarathons, setRandomMarathons] = useState([]);

    useEffect(() => {
        const shuffleAndSelect = (events) => {
            const shuffled = [...events].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 6);
        };

        setRandomMarathons(shuffleAndSelect(marathonsData.marathonEvents));

        AOS.init({
            duration: 1000, 
            once: true, 
        });
    }, []);

    return (
        <div className="px-5 md:px-0 max-w-screen-xl mx-auto my-8 md:my-10">
            <h2 className="text-xl md:text-3xl font-bold text-center mb-6">
                <Typewriter words={['Upcoming Marathons', 'Ready, Set, Go!', 'Explore Upcoming Races']} loop={false} cursor cursorStyle="|"
                typeSpeed={70} deleteSpeed={50}/>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {randomMarathons.map((marathon) => (
                    <div 
                        key={marathon.id} 
                        className="w-full border-y-8 bg-gray-50 rounded-xl border-[#228B22] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                        data-aos="fade-up" 
                    >
                        <img src={marathon.image} alt={marathon.title} 
                        className="w-full h-48 object-cover" />

                        <div className="py-6 px-3">
                            <h2 className="font-bold text-sm md:text-base mb-2 text-gray-800">{marathon.title}</h2>

                            <p className="text-gray-600 mb-2 text-xs md:text-sm">
                                <strong>
                                </strong> {marathon.description}
                            </p>

                            <p className="text-gray-600 mb-1 text-xs md:text-sm">
                                <strong><BsFillCalendar2DateFill className='inline-block text-[#6E2B4E] mr-1'/>
                                </strong>Start Date: {new Date(marathon.startDate).toLocaleDateString()}
                            </p>

                            <p className="text-gray-600 mb-1 text-xs md:text-sm">
                                <strong><FaLocationDot className='inline-block text-[#6E2B4E] mr-1'/>
                                </strong> {marathon.location}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingMarathons;
