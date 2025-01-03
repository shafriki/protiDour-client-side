import React from 'react';
import { FaSquareFacebook } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { SiOpenstreetmap } from "react-icons/si";
import { SiGooglemaps } from "react-icons/si";
import logo from '../../../assets/protidour.png';
import { Link } from 'react-router-dom';



const Footer = () => {
    return (
        <div>
            {/* footer one */}
            <footer className="footer bg-base-200  p-10  bg-gradient-to-r from-[#1B1B1D] via-[#272730] to-[#6E2B4E] text-white">
{/* bg-gradient-to-r from-[#1A1A1A] via-[#33334D] to-[#732C59] text-white */}
                {/* company logo section */}
                <aside>
                    <img src={logo} className='w-16 md:w-20' />
                    <p>
                    প্রতিদৌড়
                    <br />
                    Connecting runners,<br /> organizing marathons effortlessly.
                    </p>
                </aside>

                {/* contact us section */}
                <nav>
                    <h6 className="footer-title">Contact Us</h6>
                    <a className="link link-hover">Head office</a>
                    <a className="link link-hover flex items-center gap-1"><SiGooglemaps className='text-lg text-[#af025c]'/>
                    Rajshahi, Dhaka Bangladesh</a>
                    <a className="link link-hover flex items-center gap-1"><FaPhoneAlt className='text-[#af025c]'/>
                    +88 01786141015</a>
                    <a className="link link-hover flex items-center gap-1"><FaWhatsapp className='text-lg text-[#af025c]'/>
                    +88 01786141015 ( Message only )</a>
                    <a className="link link-hover flex items-center gap-1"><SiOpenstreetmap className='text-lg text-[#af025c]'/>
                    Map Link: <p className='text-[#bb387c]'>https://maps.google.com/</p></a>

                </nav>

                {/* navlink section */}
                <nav>
                    <h6 className="footer-title">প্রতিদৌড়</h6>
                    <Link to='/marathons' className="link link-hover">Marathons</Link>
                    <Link to='add-marathons' className="link link-hover">Add Marathons</Link>
                    <Link to='my-marathons' className="link link-hover">My Marathons</Link>
                    <Link to='/my-apply' className="link link-hover">My Apply</Link>
                </nav>

                {/* legal condition section */}
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                    <a className="link link-hover">ডিজিটাল কমার্স নির্দেশিকা ২০২১</a>

                </nav>

                </footer>

               {/* footer two */}
                    <footer className="footer-center bg-base-200 py-5 border-gray-500 border-t bg-gradient-to-r from-[#1B1B1D] via-[#272730] to-[#6E2B4E] text-white">

                    {/* social icons */}
                    <nav className='mb-4'>
                        <div className="grid grid-flow-col gap-2 md:gap-4 justify-center">
                            <a><FaSquareFacebook className='text-2xl md:text-3xl text-white'/></a>

                            <a><FaSquareInstagram className='text-2xl md:text-3xl text-white'/></a>

                            <a><IoLogoYoutube className='text-2xl md:text-3xl text-white'/></a>

                            <a><IoLogoLinkedin className='text-2xl md:text-3xl text-white'/></a>

                            <a><IoLogoTwitter className='text-2xl md:text-3xl text-white'/></a>
                        </div>
                    </nav>

                    {/* copy right */}
                    <aside>
                        <p className='text-xs md:text-sm'>Copyright © {new Date().getFullYear()} - All right reserved by প্রতিদৌড় </p>
                    </aside>
                    </footer>

        </div>
    );
};

export default Footer;