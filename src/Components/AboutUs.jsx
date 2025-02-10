import React from "react";
import { Fade } from "react-awesome-reveal";
import { Typewriter } from 'react-simple-typewriter'; 

const AboutUs = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 max-w-screen-xl md:mx-auto items-center p-6 rounded-xl lg:p-12 bg-gray-100 mx-3 my-32">

      {/* img content */}
      <div className="w-full lg:w-2/5">
        <Fade cascade damping={0.1}>
          <h2 className="text-base md:text-2xl font-bold text-[#228B22] mb-6">
            Let’s Talk About ProtiDour Journey
          </h2>

          <div className="grid grid-cols-2 gap-1 md:gap-4">
            <img src="https://i.ibb.co.com/hg1XtZ0/a-1.webp" className="w-full h-32 md:h-48 object-cover rounded-lg"/>
            
            <img src="https://i.ibb.co.com/556qsrW/a-2.webp" className="w-full h-32 md:h-48 object-cover rounded-lg" />

            <img src="https://i.ibb.co.com/D45pbqm/a4.webp" className="w-full h-32 md:h-48 object-cover rounded-lg" />
            
            <img src="https://i.ibb.co.com/gDkFNcn/a-4.webp" className="w-full h-32 md:h-48 object-cover rounded-lg" />
          </div>
        </Fade>
      </div>

      {/* text content */}
      <div className="w-full lg:w-3/5 text-left">
        <Fade cascade damping={0.1}>
          <p className="text-sm text-[#228B22] mb-4">Join Us Today!</p>

          {/* react type writer text */}
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-1">
            <Typewriter
              words={[
                "About ProtiDour",
                "About Our Mission",
                "About Our Vission"
              ]}
              loop={0} 
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1500}/>
          </h1>

          <div className="flex items-start">
            <div>
              <p className="text-xs text-justify text-gray-600 mt-2 md:text-base">
                Welcome to ProtiDour, your ultimate Marathon! We connect event organizers with participants, making it easy to create, sign up for, and manage marathon events. Enjoy a personalized dashboard to track your registrations and experience a seamless process while exploring the power of secure, full-stack applications.
              </p>
            </div>
          </div>
          
        </Fade>
      </div>
    </div>
  );
};

export default AboutUs;
