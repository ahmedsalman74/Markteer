/* eslint-disable no-else-return */
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { uploadSingleImage } = require('../middlewares/uploadimageMiddleware')
const userModel = require('../models/userModel');
const factory = require('./handlersFactory');
const AppError = require('../utils/appError');
const createToken = require('../utils/createToken');

const uploadDirectory = 'uploads/users';

// Ensure the upload directory exists, if not, create it

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}


const uploadUserImage = uploadSingleImage('image');

const resizeImage = asyncHandler(async (req, res, next) => {
    if (!req.file) return next();
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/users/${filename}`);

    req.body.image = filename;
    next();
});


//@desc get a list of users
//@route GET /api/1/users
//@access privet
const getUsers = factory.getAll(userModel)


//@desc get a single Brand
//@route GET /api/1/users/:id
//@access privet
const getSingleUser = factory.getOne(userModel);

//@desc create new User
//@route POST /api/1/users
//@access private
const createUser = factory.createOne(userModel);

//@desc update User
//@route PUT /api/1/users/:id
//@access private
const updateUser = asyncHandler(async (req, res, next) => {
    const document = await userModel.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            slug: req.body.slug,
            phone: req.body.phone,
            email: req.body.email,
            image: req.body.image,
            role: req.body.role,
        },
        {
            new: true,
        }
    );

    if (!document) {
        return next(new AppError(`No document for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });

})

//desc change password
//@route PUT /api/1/users/changePassword/:id/
//@access private

const changePassword = asyncHandler(async (req, res, next) => {
    const document = await userModel.findByIdAndUpdate(
        req.params.id,
        {
            password: await bcrypt.hash(req.body.password, 12),
            passwordChangedAt: Date.now(),
        },
        {
            new: true,
        }
    );

    if (!document) {
        return next(new AppError(`No document for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
})



//desc delete User
//@route DELETE /api/1/users/:id
//@access private

const DeleteUser = factory.deleteOne(userModel);


const loggedInUser = asyncHandler(async (req, res, next) => {
    req.params.id = req.user.id;
    next();
});


//desc change my password
//@route PUT /api/1/users/changeMypassword
//@access protected

const changeMypassword = asyncHandler(async (req, res, next) => {
   // 1) Update user password based user payload (req.user._id)
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  // 2) Generate token
  const token = createToken(user._id);

  res.status(200).json({ data: user, token });
});

//dec update my data from my account
//@route PUT /api/1/users/updateLoggedInUser
//@access protected
const updateLoggedInUser = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate(
        req.user.id,
        {
            name: req.body.name,
            slug: req.body.slug,
            phone: req.body.phone,
            email: req.body.email,
            image: req.body.image,
           
        },
        {
            new: true,
        }
    );

    if (!user) {
        return next(new AppError(`No user for this id ${req.params.id}`, 404));
    }
    // 2) Generate token
  const token = createToken(user._id);

  res.status(200).json({ data: user, token });
});

//decativate my account
//@route DELETE /api/1/users/deactivateMyAccount
//@access protected
const deactivateMyAccount = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        {
            active: false,
        }
    );

    if (!user) {
        return next(new AppError(`No user for this id ${req.params.id}`, 404));
    }
  
  res.status(204).json({message:"your account has been deleted successfully "});
});

//ativate my account
//@route DELETE /api/1/users/activateMyAccount
//@access protected
const activateMyAccount = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        {
            active: true,
        }
    );

    if (!user) {
        return next(new AppError(`No user for this id ${req.params.id}`, 404));
    }
  
  res.status(204).json({message:"your account has been activated successfully "});
});


module.exports = {
        getUsers,
        createUser,
        getSingleUser,
        updateUser,
        DeleteUser,
        uploadUserImage,
        resizeImage,
        changePassword,
        loggedInUser,
        changeMypassword,
        updateLoggedInUser,
        deactivateMyAccount,
        activateMyAccount
    };