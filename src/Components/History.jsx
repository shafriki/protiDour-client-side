import React from 'react';

const History = () => {
    return (
        <div className='relative max-w-screen-xl mx-3 md:mx-auto flex flex-col py-16 md:py-24 my-32 bg-cover bg-center' style={{ backgroundImage: "url('https://i.ibb.co.com/98mbN9g/pexels-runffwpu-2654902.jpg')" }}>

            <div className="absolute inset-0 bg-black opacity-70"></div>

            {/* header content */}
            <div className="relative z-10 text-center text-white px-2 md:px-10">
                <h1 className='text-3xl md:text-4xl font-bold mb-2'>Our History</h1>
                <p className='text-base md:text-xl font-semibold mb-4'>Join Our Proud Community of Marathon Achievers</p>
            </div>

            {/* statistics content */}
            <div className="bg-opacity-50 bg-white shadow max-w-screen-xl mx-auto px-0 md:px-4 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 md:gap-6">
                    <div className="stat place-items-center">
                        <div className="stat-title text-red-600">Events</div>
                        <div className="stat-value">20+</div>
                    </div>

                    <div className="stat place-items-center">
                        <div className="stat-title text-red-600">Runners</div>
                        <div className="stat-value ">5000+</div>
                    </div>

                    <div className="stat place-items-center">
                        <div className="stat-title text-red-600">Clients</div>
                        <div className="stat-value">100+</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
