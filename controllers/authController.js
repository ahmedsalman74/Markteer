const crypto = require('crypto');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const createToken = require('../utils/createToken');
const sendEmail = require('../utils/sendEmail');
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

    const token = createToken(newUser._id);

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser,
        },
        token: token,
    });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
// @usage   Public

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
    const token = createToken(user._id);
    // Delete password from response
    delete user._doc.password;
    // 4) send response to client side
    res.status(200).json({ data: user, token });
})


const protect = asyncHandler(async (req, res, next) => {
    let token;
    // 1) Getting token and check of it's there
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await userModel.findById(decoded.userId);
    if (!currentUser.active) {
        return next(new AppError('This account is deactivated', 401));
    };

    if (!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }
    // 4) Check if user changed password after the token was issued
    if (currentUser.passwordChangedAt) {
        const passChangedTimestamp = parseInt(
            currentUser.passwordChangedAt.getTime() / 1000,
            10
        );
        // Password changed after token created (Error)
        if (passChangedTimestamp > decoded.iat) {
            return next(
                new AppError(
                    'User recently changed his password. please login again..',
                    401
                )
            );
        }
    }

    req.user = currentUser;
    //for user change my password to throw id to change passwoed validator
    
    next();

});

const allowedTo = (...roles) =>
    asyncHandler(async (req, res, next) => {
        // 1) access roles
        // 2) access registered user (req.user.role)

        if (!roles.includes(req.user.role)) {

            return next(
                new AppError('You are not allowed to access this route', 403)
            );
        }
        next();
    });




//@dec forget password

const forgotPassword = asyncHandler(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
        return next(new AppError('There is no user with email address.', 404));
    }
    // 2) Generate the random reset token
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString(); // Limit token length to 30 characters

    const hashedReset = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    user.passwordResetToken = hashedReset;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    user.passwordResetVerfied = false;

    await user.save();

    // 3) Send it to user's email
    const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetToken} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset code (valid for 10 min)',
            message,
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        user.passwordResetVerfied = undefined;

        await user.save();
        return next(new AppError('There is an error in sending email', 500));
    }

    res
        .status(200)
        .json({ status: 'Success', message: 'Reset code sent to email' });
});

// @desc    Verify password reset code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public
const verifyPassResetCode = asyncHandler(async (req, res, next) => {
    // 1) Get user based on reset code
    const hashedResetCode = crypto
        .createHash('sha256')
        .update(req.body.resetCode)
        .digest('hex');

    const user = await userModel.findOne({
        passwordResetToken: hashedResetCode,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
        return next(new AppError('Reset code invalid or expired'));
    }

    // 2) Reset code valid
    user.passwordResetVerfied = true;
    await user.save();

    res.status(200).json({
        status: 'Success',
    });
});

// @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public
const resetPassword = asyncHandler(async (req, res, next) => {
    // 1) Get user based on email
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
        return next(
            new AppError(`There is no user with email ${req.body.email}`, 404)
        );
    }

    // 2) Check if reset code verified
    if (!user.passwordResetVerfied) {
        return next(new AppError('Reset code not verified', 400));
    }

    user.password = req.body.newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerfied = undefined;

    await user.save();


    // 3) if everything is ok, generate token
    const token = createToken(user._id);
    res.status(200).json({ token });
});

module.exports = {
    signUp,
    login,
    protect,
    allowedTo,
    forgotPassword,
    resetPassword,
    verifyPassResetCode
}