import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogIn, LogOut, NotebookPen, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logout_alert from "./Logout_alert";
import { useSelector } from "react-redux";
import { RiMenu3Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const navigate = useNavigate();
    const toHome = () => {
        navigate('/')
    }

    return (
        <div className="bg-slate-50 sticky top-0 z-50 bg-opacity-95">
            <div className="flex xs:flex-row items-center justify-between mx-auto pr-2 xs:pr-0 max-w-7xl h-14">
                {/* Logo Section */}
                <div className="relative">
                    <h1 className="text-2xl font-bold ml-3 cursor-pointer" onClick={toHome}>
                        Career<span className="text-[#720947]">Connect</span>
                    </h1>
                </div>

                {/* Mobile Menu Icon */}
                <div
                    className="xs:hidden text-2xl text-black cursor-pointer"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <RiMenu3Fill />
                </div>

                {isMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                        <div className="h-1/2 w-56 bg-white absolute right-0 top-0 p-4">
                            <span
                                className="absolute right-4 top-4 text-2xl cursor-pointer"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <IoClose />
                            </span>
                            <ul className="mt-10 space-y-6">
                                {user && user.role === "recruiter" ? (
                                    <>
                                        <Link to="/admin/companies" onClick={() => setIsMenuOpen(false)}>
                                            <li className="text-black text-lg">Companies</li>
                                        </Link>
                                        <Link to="/admin/jobs" onClick={() => setIsMenuOpen(false)}>
                                            <li className="text-black text-lg">Jobs</li>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/" onClick={() => setIsMenuOpen(false)}>
                                            <li className="text-black text-lg ">Home</li>
                                        </Link>
                                        <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                                            <li className="text-black text-lg ">About</li>
                                        </Link>
                                        <Link to="/jobs" onClick={() => setIsMenuOpen(false)}>
                                            <li className="text-black text-lg ">Jobs</li>
                                        </Link>
                                        <Link to="/browse" onClick={() => setIsMenuOpen(false)}>
                                            <li className="text-black text-lg ">Browse</li>
                                        </Link>
                                        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                                            <li className="text-black text-lg ">Contact Us</li>
                                        </Link>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="hidden xs:flex items-center gap-12 justify-evenly">
                    <ul className="flex font-medium items-center justify-center gap-8">
                        {user && user.role === "recruiter" ? (
                            <>
                                <Link to="/admin/companies">
                                    <li className="text-black text-lg">Companies</li>
                                </Link>
                                <Link to="/admin/jobs">
                                    <li className="text-black text-lg">Jobs</li>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/">
                                    <li className="text-black text-lg">Home</li>
                                </Link>
                                <Link to="/about">
                                    <li className="text-black text-lg">About</li>
                                </Link>
                                <Link to="/jobs">
                                    <li className="text-black text-lg">Jobs</li>
                                </Link>
                                <Link to="/browse">
                                    <li className="text-black text-lg">Browse</li>
                                </Link>
                                <Link to="/contact">
                                    <li className="text-black text-lg">Contact Us</li>
                                </Link>
                            </>
                        )}
                    </ul>

                    {/* Authentication Buttons */}
                    {!user ? (
                        <div className="flex items-center gap-2 mr-5">
                            <Link to="/login">
                                <Button variant="outline" className="hover:transition-all duration-500 ease-in-out">
                                    <LogIn /> Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#720947] hover:bg-[#541238] transition-all duration-500 ease-in-out">
                                    <NotebookPen /> Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="mr-5">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                        <AvatarFallback>Image Profile</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 min-w-[200px]">
                                    <div className="flex flex-col items-center space-y-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                            <AvatarFallback>Image Profile</AvatarFallback>
                                        </Avatar>
                                        <h4 className="font-medium">{user.fullname}</h4>
                                        <span className="font-medium text-left">
                                            <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                        </span>
                                    </div>
                                    <div className="flex flex-col text-gray-600 my-2">
                                        {user.role === "recruiter" ? (
                                            <div className="flex w-fit items-center cursor-pointer ml-24">
                                                <LogOut />
                                                <Logout_alert />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex w-fit items-center cursor-pointer my-2">
                                                    <User2 />
                                                    <Link to="/profile">
                                                        <Button variant="link" className="outline-none">
                                                            View profile
                                                        </Button>
                                                    </Link>
                                                </div>
                                                <div className="flex w-fit items-center cursor-pointer">
                                                    <LogOut />
                                                    <Logout_alert />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
