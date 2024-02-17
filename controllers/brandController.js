/* eslint-disable no-else-return */

const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const brandModel = require('../models/brandModel');
const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const factory = require('./handlersFactory');

//@desc get a list of brands
//@route GET /api/1/brands
//@access public
const getBrands = asyncHandler(async (req, res, next) => {
    //build query
    const documentCount = await brandModel.countDocuments();
    const ApiFeaturesInstance = new ApiFeatures(brandModel.find(), req.query)
        .paginate(documentCount)
        .filter()
        .search() // Search after other transformations
        .sort() // Handle sorting before search
        .limitFields()
        ;
    //execute the query
    const { mongooseQuery, paginationResults } = ApiFeaturesInstance;
    const brand = await mongooseQuery.exec();

    res.status(200).json({
        result: brand.length,
        paginationResults,
        status: 'success',
        data: {
            brand
        }
    })
})


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
    DeleteBrand
};