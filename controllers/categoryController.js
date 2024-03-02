// Description: This file contains the logic for handling requests from the category routes.
const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const CategoryModel = require('../models/categoryModel');
const factory = require('./handlersFactory');
const{uploadSingleImage}=require('../middlewares/uploadimageMiddleware')

const uploadDirectory = 'uploads/categories';

// Ensure the upload directory exists, if not, create it
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const uploadCategoryImage = uploadSingleImage('image');

const resizeImage = asyncHandler(async (req, res, next) => {
    if (!req.file) return next();
   const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/categories/${filename}`);

    req.body.image = filename;
    next();
});



//@desc get a list of categories
//@route GET /api/1/categories
//@access public
const getCategory = factory.getAll(CategoryModel);


//@desc get a single category
//@route GET /api/1/categories/:id
//@access public
const getSingleCategory = factory.getOne(CategoryModel);


//@desc create new category
//@route POST /api/1/categories
//@access private
const createCategory = factory.createOne(CategoryModel);

//@desc update category
//@route PUT /api/1/categories/:id
//@access private
const updateCategory = factory.updateOne(CategoryModel)
//desc delete category
//@route DELETE /api/1/categories/:id
//@access private
const DeleteCategory = factory.deleteOne(CategoryModel);







module.exports = {
    getCategory,
    createCategory,
    getSingleCategory,
    updateCategory,
    DeleteCategory,
    uploadCategoryImage,
    resizeImage

};