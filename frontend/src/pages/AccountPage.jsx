import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
    const [user, setUser] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [totalDonations, setTotalDonations] = useState(0);
    const [latestScores, setLatestScores] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

                    const donationResponse = await fetch('/api/donations/total', {
                        method: 'GET',
                        credentials: 'include'
                    });
                    const donationData = await donationResponse.json();

                    if (!donationResponse.ok) {
                        throw new Error(donationData.message || 'Failed to fetch donations.');
                    }

                    setTotalDonations(donationData.total);

                    const quizResponse = await fetch('/api/quiz/latest-scores', {
                        method: 'GET',
                        credentials: 'include'
                    });
                    const quizData = await quizResponse.json();

                    if (!quizResponse.ok) {
                        throw new Error(donationData.message || 'Failed to fetch scores.');
                    }

                    setLatestScores(quizData);

                    setIsLoading(false);

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

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/change-password', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            if (response.ok) {
                setMessage('Password changed successfully.');
                setCurrentPassword('');
                setNewPassword('');
            } else {
                const error = await response.json();
                setMessage(error.message || 'Failed to change password.');
            }
        } catch (error) {
            setMessage('Error changing password.');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                navigate('/login');
            } else {
                setMessage('Failed to log out.');
            }
        } catch (error) {
            setMessage('Error logging out.');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch('/api/delete-account', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const error = await response.json();
                setMessage(error.message || 'Failed to delete account.');
            }
        } catch (error) {
            setMessage('Error deleting account.');
        }
    };

    if (!user || isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-center mb-6">Loading...</h1>;
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Account Details</h1>
                {message && <p className="text-red-500 mb-4">{message}</p>}
                <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-600 font-medium">Name</p>
                            <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-600 font-medium">Email</p>
                            <h2 className="text-lg font-semibold text-gray-900">{user.email}</h2>
                        </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg shadow-sm mt-6">
                        <p className="text-sm text-gray-600 font-medium">Total Donations</p>
                        <h2 className="text-lg font-semibold text-gray-900">{'₹ ' + totalDonations}</h2>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg shadow-sm mt-6">
                        <p className="text-sm text-gray-600 font-medium">Quiz Scores</p>
                        {latestScores.length > 0 ? (
                            <ul className="space-y-2 mt-2">
                                {latestScores.map((item, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span className="text-gray-700">{item.quizType}:</span>
                                        <span className="font-semibold text-gray-900">{item.score}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-sm mt-2">No recent scores available.</p>
                        )}
                    </div>
                </div>
                <form onSubmit={handleChangePassword} className="mb-4">
                    <h2 className="text-xl font-bold mb-3">Change Password</h2>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Change Password
                    </button>
                </form>
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    Sign Out
                </button>
                <div className="mt-8 pt-4 border-t">
                    <h2 className="text-xl font-bold mb-3 text-red-600">Danger Zone</h2>
                    {!showDeleteConfirm ? (
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="w-full bg-red-100 text-red-600 py-2 px-4 rounded hover:bg-red-200"
                        >
                            Delete Account
                        </button>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-sm text-gray-600">
                                Are you sure you want to delete your account? This action cannot be undone.
                            </p>
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleDeleteAccount}
                                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                >
                                    Yes, Delete My Account
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AccountPage;
