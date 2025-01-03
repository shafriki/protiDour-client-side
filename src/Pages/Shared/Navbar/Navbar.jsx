import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoMdLogIn } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import logo from '../../../assets/protidour.png';
import { AuthContext } from "../../../Provider/AuthProvider";
import { FadeLoader } from 'react-spinners';

const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext);

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const handleToggle = (e) => {
        setTheme(e.target.checked ? 'dark' : 'light');
    };

    const handleSignOut = () => {
        logOut().then(result => {
            // console.log('Logged out:', result);
        }).catch(err => {
            // console.error('Logout error:', err);
        });
    };

    const links = (
        <>
            <NavLink to='/' className={({ isActive }) => isActive ? 'font-bold text-[#228B22]' : 'text-[#ECF0F1]'}>Home</NavLink>
            <NavLink to='/marathons' className={({ isActive }) => isActive ? 'font-bold text-[#228B22]' : 'text-[#ECF0F1]'}>Marathons</NavLink>
            {user && (
                <>
                    <NavLink to='/add-marathons' className={({ isActive }) => isActive ? 'font-bold text-[#228B22]' : 'text-[#ECF0F1]'}>Add Marathons</NavLink>
                    <NavLink to='/my-marathons' className={({ isActive }) => isActive ? 'font-bold text-[#228B22]' : 'text-[#ECF0F1]'}>My Marathons</NavLink>
                    <NavLink to='/my-apply' className={({ isActive }) => isActive ? 'font-bold text-[#228B22]' : 'text-[#ECF0F1]'}>My Apply</NavLink>
                </>
            )}
        </>
    );

    if (loading) {
        return (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center my-4 md:my-6 z-50">
                <FadeLoader color="#228B22" loading={loading} size={50} />
            </div>
        );
    }

    return (
        <div className='bg-gradient-to-r from-[#1B1B1D] via-[#272730] to-[#6E2B4E] text-white sticky top-0 z-50 backdrop-blur opacity-85 md:py-1'>
            <div className="navbar max-w-screen-xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn px-1 btn-ghost text-[#228B22] lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-[#1B3D2F]">
                            {links}
                        </ul>
                    </div>
                    <img src={logo} alt="CrowdCube Logo" className="w-6 md:w-10" />
                    <Link to='/home' className="text-sm px-1 md:text-xl btn btn-ghost text-[#228B22]">প্রতিদৌড়</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-10">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end flex gap-1 md:gap-2 items-center">
                    <label className="cursor-pointer grid place-items-center">
                        <input type="checkbox" onChange={handleToggle} checked={theme === "dark"} className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                        <svg
                            className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                        </svg>
                        <svg
                            className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </label>

                    {user ? (
                        <>
                            <div className="dropdown z-10 dropdown-hover dropdown-bottom dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#228B22] object-cover cursor-pointer" title={user.displayName}>
                                        <img alt={user.displayName} src={user.photoURL} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content space-y-2 z-[1] menu shadow bg-base-100 rounded-box w-56">
                                    <li><button className="btn bg-[#228B22] text-white">{user.displayName}</button></li>
                                    <li><button onClick={handleSignOut} className="btn bg-[#228B22] text-white"><IoMdLogIn /> Log Out</button></li>
                                </ul>
                            </div>
                            <button onClick={handleSignOut} className="btn bg-[#228B22] border-none px-4 hover:bg-[#175c17] text-sm text-white hidden md:block">Log Out</button>
                        </>
                    ) : (
                        <>
                            <Link to='/register' className="btn bg-[#228B22] border-none px-2 md:px-4 hover:bg-[#175c17] text-xs md:text-sm text-white"><FaUserEdit />
                                Register</Link>
                            <Link to='/login' className="btn bg-[#228B22] border-none px-2 md:px-6 hover:bg-[#175c17] text-xs md:text-sm text-white"><IoMdLogIn />
                                Login</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
