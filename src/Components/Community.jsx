import React from 'react';
import Marquee from 'react-fast-marquee';

const Community = () => {
    return (
        <div className="max-w-screen-xl md:mx-auto my-32 mx-3">

            {/* header */}
            <h1 className="text-center text-xl md:text-4xl font-bold text-[#34495E] mb-8"> Join Our Marathon Achievers</h1>

            {/* marquee content */}
            <div className="flex items-center">
                <Marquee className="cursor-pointer">

                    <div className="h-16 md:h-28 w-full mr-5">
                        <img src="https://i.ibb.co.com/cJVjDN2/three.webp" className="w-full h-full object-contain" />
                    </div>

                    <div className="h-16 md:h-28 w-full mr-5">
                        <img src="https://i.ibb.co.com/w0h2s9s/ten.webp"  className="w-full h-full object-contain" />
                    </div>

                    <div className="h-16 md:h-28 w-full mr-5">
                        <img src="https://i.ibb.co.com/PDbmRrQ/six.webp"  className="w-full h-full object-contain" />
                    </div>

                    <div className="h-16 md:h-28 w-full mr-5">
                        <img src="https://i.ibb.co.com/vY8KQss/seven.webp" className="w-full h-full object-contain" />
                    </div>

                    <div className="h-16 md:h-28 w-full mr-5">
                        <img src="https://i.ibb.co.com/5Kwd9JS/one.webp"  className="w-full h-full object-contain" />
                    </div>

                    <div className="h-16 md:h-28 w-full mr-5">
                        <img src="https://i.ibb.co.com/tHqQPkT/nine.webp"  className="w-full h-full object-contain" />
                    </div>

                    <div className="h-16 md:h-28 w-full mr-5">
                        <img src="https://i.ibb.co.com/0QPyDqq/four.webp"  className="w-full h-full object-contain" />
                    </div>

                    <div className="h-16 md:h-28 w-full mr-5">
                        <img src="https://i.ibb.co.com/RcbGdn4/five.webp"  className="w-full h-full object-contain" />
                    </div>

                    <div className="h-16 md:h-28 w-full mr-5">
                        <img src="https://i.ibb.co.com/sHS62zX/eight.webp"  className="w-full h-full object-contain" />
                    </div>

                    <div className="h-16 md:h-28 w-full mr-5">
                        <img src="https://i.ibb.co.com/dmHdGZq/two.webp"  className="w-full h-full object-contain" />
                    </div>
                </Marquee>
            </div>
        </div>
    );
};

export default Community;
