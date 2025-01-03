import React from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            {/* navbar content */}
            <Navbar></Navbar>

            {/* outlet part with accurate height */}
            <div className="min-h-[calc(100vh-427px)] ">
                <Outlet></Outlet>
            </div>

            {/* footer content */}
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;