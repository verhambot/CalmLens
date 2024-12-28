import React, { useState, useEffect } from 'react';

const QuickHelpPage = () => {

    const [helplines, setHelpInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHelpInfo = async () => {
            try {
                const response = await fetch('/api/helpInfo', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setHelpInfo(data);
                    setIsLoading(false);
                } else {
                    setMessage('Failed to fetch help info details.');
                    setIsLoading(false);
                }
            } catch (error) {
                setMessage('Error fetching help info details.');
            }
        }

        fetchHelpInfo();
    })

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-center mb-6">Loading...</h1>;
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Quick Help</h1>
            <p className="text-center text-gray-700 mb-8">
                Reach out to these trusted mental health helplines for immediate support.
            </p>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {helplines.map((helpline, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 rounded-lg shadow-lg p-6 flex flex-col justify-between border border-gray-200"
                    >
                        <h2 className="text-lg font-semibold mb-2 text-blue-700">
                            {helpline.name}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4">{helpline.description}</p>
                        <div className="text-sm mb-2">
                            <strong>Number: </strong>
                            <a href={`tel:${helpline.number}`} className="text-blue-500">
                                {helpline.number}
                            </a>
                        </div>
                        <div className="text-sm">
                            <strong>Availability: </strong>
                            {helpline.availability}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuickHelpPage;
