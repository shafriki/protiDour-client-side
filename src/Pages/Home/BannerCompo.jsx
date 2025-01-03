import React from 'react';
import Banner from './Banner';

const BannerCompo = () => {
    return (
        <div className="grid grid-cols-1 gap-1 md:gap-2 p-2 w-full md:grid-cols-3">

            {/* banner */}
            <div className="md:col-span-2">
                <Banner />
            </div>

            {/* two images */}
            <div className="md:col-span-1 flex flex-row md:flex-col gap-[1px] md:gap-1">
                <img src="https://i.ibb.co.com/58vtr8L/s-2.png"alt="Banner Image 1"
                    className="w-1/2 md:w-full object-cover "/>
                    
                <img src="https://i.ibb.co.com/StDStdY/s-1.png" alt="Banner Image 2" className="w-1/2 md:w-full  object-cover"/>
            </div>
        </div>
    );
};

export default BannerCompo;

