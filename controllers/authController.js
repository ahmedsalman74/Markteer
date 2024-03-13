const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const AppError = require('../utils/appError');

const signToken = (id) => {
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};



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

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser,
        },
        token: token,
    });
});


const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await userModel.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }
    // 3) If everything ok, send token to client
    const token = signToken(user._id);
    // Delete password from response
    delete user._doc.password;
    // 4) send response to client side
    res.status(200).json({ data: user, token });
})




module.exports = {
    signUp,
    login
}