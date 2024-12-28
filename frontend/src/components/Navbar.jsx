import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link to="/" className="text-2xl font-bold">CalmLens</Link>
                <div className="space-x-4">
                    <Link to="/blog" className="hover:text-blue-200">Blog</Link>
                    <Link to="/meditation" className="hover:text-blue-200">Meditation</Link>
                    <Link to="/donations" className="hover:text-blue-200">Donations</Link>
                    <Link to="/quiz" className="hover:text-blue-200">Quiz</Link>
                    <Link to="/quick-help" className="hover:text-blue-200">Quick Help</Link>
                    <Link to="/login" className="hover:text-blue-200">Login</Link>
                    <Link to="/register" className="hover:text-blue-200">Register</Link>
                    <Link to="/account" className="hover:text-blue-200">Account</Link>
                    <Link to="/about" className="hover:text-blue-200">About Us</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
