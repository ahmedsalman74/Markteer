const crypto = require('crypto');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const createToken = require('../utils/createToken');
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
    user.passwordResetVerified = false;

    await user.save();

    // 3) Send it to user's email
    // try {
    //     const resetURL = `${req.protocol}://${req.get(
    //         'host'
    //     )}/api/v1/users/resetPassword/${resetToken}`;
    //     await new Email(user, resetURL).sendPasswordReset();
    //     res.status(200).json({
    //         status: 'success',
    //         message: 'Token sent to email!',
    //     });
    // } catch (err) {
    //     user.passwordResetToken = undefined;
    //     user.passwordResetExpires = undefined;
    //     await user.save({ validateBeforeSave: false });
    //     return next(
    //         new AppError('There was an error sending the email. Try again later!'),
    //         500
    //     );
    // }
});

module.exports = {
    signUp,
    login,
    protect,
    allowedTo,
    forgotPassword
}