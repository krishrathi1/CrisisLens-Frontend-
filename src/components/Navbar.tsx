import React from 'react';
import { BarChart, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select } from '@mui/material';

export function Navbar() {
    return (
        <nav 
            className={`
                fixed top-0 left-0 right-0 z-50 
                bg-gradient-to-r from-sky-600 via-cyan-700 to-teal-600
                shadow-xl border-b border-sky-700/30
                backdrop-blur-md bg-opacity-90
                h-20 flex items-center
            `}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo Section */}
                <div 
                    className="
                        flex items-center space-x-4
                        transform transition-transform duration-300 hover:scale-[1.02]
                    "
                >
                    <Link
                        target="_blank" 
                        to={"/"}
                        className="transform transition-transform hover:scale-105"
                    >
                        <img
                            className="w-16 h-16 rounded-full ring-4 ring-sky-500/50 object-cover shadow-md"
                            src="/disaster/disaster_logo.png"
                            alt="Crisislens Logo"
                        />
                    </Link>
                    <Link
                        to={"/"}
                        className="
                            text-3xl font-extrabold 
                            bg-clip-text text-transparent 
                            bg-gradient-to-r from-white to-sky-200
                            hover:from-sky-200 hover:to-white
                            transition-all duration-300
                        "
                    >
                        CrisisLens
                    </Link>
                </div>

                {/* Navigation Links */}
                <div 
                    className="flex items-center space-x-8"
                >
                    <NavLink href="/statistics" icon={<BarChart />}>
                        Statistics
                    </NavLink>
                    <NavLink href="/virat" icon={<Settings />}>
                        Trends
                    </NavLink>
                    <NavLink href="/login">
                        Login
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

function NavLink({
    href,
    children,
    icon
}: {
    href: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
}) {
    return (
        <Link
           to={href}
            className="
                flex items-center gap-2 
                text-white text-xl font-bold 
                group relative 
                transition-all duration-300
                hover:text-sky-100
                transform hover:scale-105 active:scale-95
            "
        >
            {icon && (
                <span className="
                    text-white/80 group-hover:text-white 
                    transition-colors duration-300
                ">
                    {icon}
                </span>
            )}
            <span className="relative">
                {children}
                <span className="
                    absolute -bottom-1 left-0 
                    w-0 h-0.5 
                    bg-white 
                    group-hover:w-full 
                    transition-all duration-300
                "></span>
            </span>
        </Link>
    );
}

export default Navbar;