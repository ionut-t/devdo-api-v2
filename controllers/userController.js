const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Create user
exports.signup = async (req, res, next) => {
    try {
        // Check if a user with email address exists in database
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'A user with this email address already exists.'
            });
        }

        // Create new user
        const user = await User.create(req.body);

        res.status(201).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        res.status(401).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if user has entered his email or password
    if (!email || !password) {
        return res.status(401).json({
            message: 'Enter your email and password'
        });
    }
    try {
        // Find user by email
        const user = await User.findOne({ email })
            .select('+password')
            .select('+active');

        // Check if user exists in database
        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Authentication failed. This email is not registered.'
            });
        }

        if (user.active === false) {
            return res.status(401).json({
                status: 'fail',
                message:
                    'Authentication failed. This account have been deactivated.'
            });
        }

        // Check if password is correct
        if (!(await user.checkPassword(password, user.password))) {
            return res.status(401).json({
                message:
                    'Authentication failed. The email or password is not correct.'
            });
        }
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        res.status(200).json({
            message: 'Authentication succeeded',
            token,
            expiresIn: process.env.JWT_EXPIRES_IN * 360 * 1000
        });
    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
};

// Get all users
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: { users }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Delete user -> change active status
exports.deleteAccount = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { active: false });
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
