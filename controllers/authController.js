const asyncHandler = require('express-async-handler');

const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const AppError = require('../utils/appError');


// @desc    Register a new user
// @route   POST /api/v1/auth/signup
// @access  Public
// @usage   Public
const signUp = asyncHandler(async (req, res, next) => {
    const { name, email, password, phone } = req.body;
    const newUser = await userModel.create({
        name,
        email,
        password,
        phone,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({
        status: 'success',
        data: {
            user: newUser,
        },
        token: token,
    });
});




module.exports = {
    signUp
}