import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FadeLoader } from 'react-spinners'; 
import { IoLocation } from "react-icons/io5";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeMarathons = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with desired options
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/limitMarathons`);
      setMarathons(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching marathons:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center my-4 md:my-6 z-50">
      <FadeLoader color="#228B22" loading={loading} size={50} />
    </div>;
  }

  return (
    <div className="px-5 md:px-0 max-w-screen-xl mx-auto my-8 md:my-10">

      <h1 className="text-xl md:text-3xl font-bold text-center mb-4 md:mb-8">Explore Marathons</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marathons.map((marathon) => (
          <div key={marathon._id} data-aos="fade-up" className="w-full border-y-8 bg-gray-50 rounded-xl border-[#6E2B4E] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <img src={marathon.marathonImage} alt={marathon.marathonTitle} className="w-full h-48 object-cover" />

            <div className="py-6 px-3">
              <h2 className="font-bold text-sm md:text-base mb-2 text-gray-800">{marathon.marathonTitle}</h2>

              <p className="text-gray-600 mb-1 text-xs md:text-sm"><IoLocation className="inline-block md:text-lg mr-1 text-[#228B22]" />
                {marathon.location}</p>

              <div className="flex mt-2 justify-between">
                <p className="text-xs md:text-sm text-gray-500 mb-1"><FaCalendarCheck className="inline-block md:text-lg mr-1 text-[#22438b]" /> {`Start Date: ${new Date(marathon.registrationStartDate).toLocaleDateString()}`}</p>

                <p className="text-xs md:text-sm text-gray-500"><FaCalendarTimes className="inline-block md:text-lg mr-1 text-[#8b2222]" />{`End Date: ${new Date(marathon.registrationEndDate).toLocaleDateString()}`}
                </p>
              </div>

              <Link to={`/marathon/${marathon._id}`} className="btn opacity-90 w-full mt-4 px-4 py-2 text-white text-sm font-medium rounded bg-gradient-to-r from-[#1b1d1b] via-[#273028] to-[#2b6e37] hover:from-[#273027] hover:via-[#2b6e3c] hover:to-[#1b1d1c] focus:outline-none focus:ring-2 focus:ring-[#2b6e42] focus:ring-opacity-75">
                See Details
              </Link>
            </div>
            
          </div>
        ))}
      </div>
      <Link to="/marathons"><div className="flex mt-5 items-center justify-center"><button className="btn bg-[#228B22] text-white">Explore All Marathons</button></div>
      </Link>
    </div>
  );
};

export default HomeMarathons;
