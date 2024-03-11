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
            profileImg: req.body.profileImg,
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






module.exports = {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    DeleteUser,
    uploadUserImage,
    resizeImage,
    changePassword
};