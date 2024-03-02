/* eslint-disable no-else-return */
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
const { uploadSingleImage } = require('../middlewares/uploadimageMiddleware')
const brandModel = require('../models/brandModel');
const factory = require('./handlersFactory');

const uploadDirectory = 'uploads/brands';

// Ensure the upload directory exists, if not, create it
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}


const uploadBrandImage = uploadSingleImage('image');

const resizeImage = asyncHandler(async (req, res, next) => {
    if (!req.file) return next();
    const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`uploads/brands/${filename}`);

    req.body.image = filename;
    next();
});


//@desc get a list of brands
//@route GET /api/1/brands
//@access public
const getBrands = factory.getAll(brandModel)


//@desc get a single Brand
//@route GET /api/1/brands/:id
//@access public
const getSingleBrand = factory.getOne(brandModel);

//@desc create new brand
//@route POST /api/1/brands
//@access private
const createBrand = factory.createOne(brandModel);

//@desc update brand
//@route PUT /api/1/brands/:id
//@access private
const updateBrand = factory.updateOne(brandModel)

//desc delete brand
//@route DELETE /api/1/categories/:id
//@access private

const DeleteBrand = factory.deleteOne(brandModel);






module.exports = {
    getBrands,
    createBrand,
    getSingleBrand,
    updateBrand,
    DeleteBrand,
    uploadBrandImage,
    resizeImage
};