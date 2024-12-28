import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import BlogPage from './pages/BlogPage';
import MeditationPage from './pages/MeditationPage';
import DonationsPage from './pages/DonationsPage';
import QuizPage from './pages/QuizPage';
import QuickHelpPage from './pages/QuickHelpPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/meditation" element={<MeditationPage />} />
                <Route path="/donations" element={<DonationsPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/quick-help" element={<QuickHelpPage />} />
                <Route path="/account" element={<AccountPage />} />
            </Routes>
        </Router>
    );
}

export default App;
