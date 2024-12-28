import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <section className="py-16 text-center bg-gradient-to-b from-indigo-500 to-blue-400 text-white">
                <h1 className="text-4xl font-bold mb-4">Welcome to CalmLens</h1>
                <p className="text-lg max-w-xl mx-auto">Your safe space for exploring mental wellness.</p>
            </section>

            <section className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                <Link to="/quiz" className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold mb-2">Take a Quiz</h2>
                    <p className="text-gray-700">Explore your mental state with insightful quizzes.</p>
                </Link>
                <Link to="/meditation" className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold mb-2">Relax with Meditation</h2>
                    <p className="text-gray-700">Access guided meditation tracks to find your calm.</p>
                </Link>
                <Link to="/blog" className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold mb-2">Read Our Blog</h2>
                    <p className="text-gray-700">Learn and grow with mental health insights from our blog.</p>
                </Link>
                <Link to="/donations" className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold mb-2">Make a Donation</h2>
                    <p className="text-gray-700">Support our mission with a contribution (demo only).</p>
                </Link>
                <Link to="/quick-help" className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold mb-2">Quick Help</h2>
                    <p className="text-gray-700">Find immediate support and resources for mental health assistance.</p>
                </Link>
                <Link to="/about" className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold mb-2">About Us</h2>
                    <p className="text-gray-700">
                        Learn more about our mission and the people behind CalmLens.
                    </p>
                </Link>
            </section>
        </div>
    );
};

export default HomePage;
