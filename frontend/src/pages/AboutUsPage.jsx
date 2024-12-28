import React from 'react';

const AboutUsPage = () => {
    return (
        <div className="min-h-screen bg-white text-gray-800">
            <section className="py-16 px-8 text-center bg-gray-100">
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-lg max-w-2xl mx-auto text-gray-700">
                    We’re a team of passionate individuals committed to making mental health support accessible.
                </p>
            </section>

            <section className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                <div className="p-6 bg-indigo-100 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
                    <p className="text-gray-700">To provide a safe, accessible platform for mental health support.</p>
                </div>
                <div className="p-6 bg-indigo-100 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2">Meet the Team</h2>
                    <p className="text-gray-700">A group of three friends dedicated to helping others find calm and clarity.</p>
                </div>
                <div className="p-6 bg-indigo-100 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
                    <p className="text-gray-700">To become a supportive community for everyone’s mental well-being.</p>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;
