const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require('../models/User');
const Donation = require('../models/Donation');
const Quiz = require('../models/Quiz');
const HelpInfo = require('../models/HelpInfo');

const router = express.Router();

const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const userId = await User.create(name, email, password);
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isValid = await User.validatePassword(user, password);
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        req.session.user = { id: user._id, name: user.name, email: user.email };
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/account', requireAuth, (req, res) => {
    const { user } = req.session;
    res.json({ name: user.name, email: user.email });
});

router.post('/change-password', requireAuth, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await User.findByEmail(req.session.user.email);
        const isValid = await User.validatePassword(user, currentPassword);
        if (!isValid) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        await User.updatePassword(user.email, newPassword);

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logout successful' });
});

router.post('/delete-account', requireAuth, async (req, res) => {
    try {
        await User.deleteAccount(req.session.user.email);
        req.session.destroy();
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Account deletion error:', error);
        res.status(500).json({ message: 'Failed to delete account' });
    }
});

router.post('/donate', requireAuth, async (req, res) => {
    const { amount, method } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid donation amount' });
    }
    if (!method) {
        return res.status(400).json({ message: 'Payment method is required' });
    }
    try {
        const donationId = await Donation.create(req.session.user.email, amount, method);
        res.status(201).json({
            message: 'Donation recorded successfully',
            donationId,
        });
    } catch (error) {
        console.error('Donation error:', error);
        res.status(500).json({ message: 'Failed to record donation' });
    }
});

router.get('/donations/total', requireAuth, async (req, res) => {
    try {
        const email = req.session.user.email;
        const total = await Donation.getTotalByEmail(email);

        res.json({ total });
    } catch (error) {
        console.error('Error fetching total donations:', error);
        res.status(500).json({ message: 'Failed to fetch total donations' });
    }
});

router.post('/quiz/submit', requireAuth, async (req, res) => {
    const { quizType, score } = req.body;

    if (!quizType || typeof score !== 'number') {
        return res.status(400).json({ message: 'Invalid request. Quiz type and score are required.' });
    }

    try {
        const userEmail = req.session.user.email;
        await Quiz.addQuizResult(userEmail, quizType, score);

        res.status(201).json({ message: 'Quiz result submitted successfully' });
    } catch (error) {
        console.error('Error saving quiz result:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/quiz/latest-scores', requireAuth, async (req, res) => {
    try {
        const userEmail = req.session.user.email;
        const latestResults = await Quiz.getLatestResultsByType(userEmail);

        res.status(200).json(latestResults);
    } catch (error) {
        console.error('Error fetching latest quiz results:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/helpInfo', async (req, res) => {
    try {
        const data = await HelpInfo.getAllHelpInfo();
        res.json(data);
    } catch (error) {
        console.error('Error fetching total donations:', error);
        res.status(500).json({ message: 'Failed to fetch total donations' });
    }
});

module.exports = router;
