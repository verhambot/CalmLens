import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import track1 from '../assets/3-min-mindful-breathing-for-daily-journey.mp3';
import track2 from "../assets/meditation-bowls.mp3";
import track3 from "../assets/meditation-music-without-nature-sound.mp3";
import track4 from "../assets/meditative-rain.mp3";
import track5 from "../assets/ten-breath-practice-introduction.mp3";
import track6 from "../assets/ten-breath-practice.mp3";
import track7 from "../assets/what-is-mindfulness-tips-for-journey.mp3";
import track8 from "../assets/zen-cascade-meditation-spa-relaxation-music.mp3";

const audioTracks = [
    {
        title: "3-Min Mindful Breathing for Daily Journey",
        src: track1,
    },
    {
        title: "Meditation Bowls",
        src: track2,
    },
    {
        title: "Meditation Music Without Nature Sound",
        src: track3,
    },
    {
        title: "Meditative Rain",
        src: track4,
    },
    {
        title: "Ten-Breath Practice Introduction",
        src: track5,
    },
    {
        title: "Ten-Breath Practice",
        src: track6,
    },
    {
        title: "What is Mindfulness? Tips for Journey",
        src: track7,
    },
    {
        title: "Zen Cascade Meditation Spa Relaxation Music",
        src: track8,
    },
];

const MeditationPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('/api/account', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else if (response.status === 401) {
                    navigate('/login');
                } else {
                    setMessage('Failed to fetch account details.');
                }
            } catch (error) {
                setMessage('Error fetching account details.');
            }
        };

        fetchUserDetails();
    }, [navigate]);

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-center mb-6">Loading...</h1>;
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Meditation Page</h1>
            <p className="text-center text-gray-700 mb-8">
                Explore our collection of meditation tracks. Click play to start your journey to relaxation.
            </p>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {audioTracks.map((track, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                    >
                        <h2 className="text-lg font-semibold mb-3 text-center">{track.title}</h2>
                        <audio controls className="w-full">
                            <source src={track.src} type="audio/mp3" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MeditationPage;
