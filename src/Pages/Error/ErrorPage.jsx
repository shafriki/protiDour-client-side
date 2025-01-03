import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {

    useEffect(() => {
        document.title = "Error";
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-white px-4">
            <div className="text-center">
                <iframe src="https://giphy.com/embed/C21GGDOpKT6Z4VuXyn" 
                    width="100%" height="auto" 
                    className="max-w-full h-auto md:max-w-[480px] md:h-[280px]">
                </iframe>
                
                <Link to='/home'>
                    <button className='btn mt-5 px-8 py-2 bg-[#1B3D2F] border-none text-white text-sm md:text-lg hover:bg-[#429271] '>Back To ProtiDour
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;