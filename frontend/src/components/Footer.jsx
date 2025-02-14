
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (


        <footer>

            <div className=" bg-gray-900">
                <div className="max-w-2xl mx-auto text-white py-10">
                    <div className="text-center">
                        <h3 className="text-3xl mb-3"> Download CareerConnect </h3>
                        <p> Stay Tune. All day, every day. </p>
                        <div className="flex justify-center my-10">
                            <div className="flex items-center border w-auto rounded-lg px-4 py-2  mx-2">
                                <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" className="w-7 md:w-8" />
                                <div className="text-left ml-3">
                                    <p className='text-xs text-gray-200'>Download on </p>
                                    <p className="text-sm md:text-base"> Google Play Store </p>
                                </div>
                            </div>
                            <div className="flex items-center border w-auto rounded-lg px-4 py-2  mx-2">
                                <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png" className="w-7 md:w-8" />
                                <div className="text-left ml-3">
                                    <p className='text-xs text-gray-200'>Download on </p>
                                    <p className="text-sm md:text-base"> Apple Store </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
                        <p className="order-2 md:order-1 mt-8 md:mt-0"> &copy; All rights are reserved by @creator: Milan . </p>
                        <div className="order-1 md:order-2">
                           <Link to="/about"><span className="px-2">About us</span></Link> 
                           <Link to="/jobs"><span className="px-2">Jobs</span></Link> 
                           <Link to="/browse"><span className="px-2">Browse</span></Link> 
                           <Link to="/contact"><span className="px-2">Contact Us</span></Link> 
                            
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        


    );
};

export default Footer;