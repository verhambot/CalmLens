import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DonationsPage = () => {

  const [user, setUser] = useState(null);

  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!amount || amount <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }
    if (!method) {
      setError('Please select a payment method.');
      return;
    }

    try {
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseFloat(amount), method }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to process donation.');
        return;
      }

      const data = await response.json();
      setMessage('Thank you for your donation of ₹' + amount + ' !');
      setAmount('');
      setMethod('');
    } catch (err) {
      console.error('Donation error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-center mb-6">Loading...</h1>;
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Donate to CalmLens</h1>
        {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block font-medium text-gray-700 mb-1">
              Donation Amount (₹):
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              min="0.01"
              step="0.01"
              required
            />
          </div>
          <div>
            <label htmlFor="method" className="block font-medium text-gray-700 mb-1">
              Payment Method:
            </label>
            <select
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="" disabled>
                Select a method
              </option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Donate Now
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Your contribution helps us support mental health initiatives and resources.
        </p>
      </div>
    </div>
  );
};

export default DonationsPage;
