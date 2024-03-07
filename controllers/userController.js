/* eslint-disable no-else-return */
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
const { uploadSingleImage } = require('../middlewares/uploadimageMiddleware')
const userModel = require('../models/userModel');
const factory = require('./handlersFactory');

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
const updateUser = factory.updateOne(userModel)

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
    resizeImage
};