/* eslint-disable no-else-return */

const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const brandModel = require('../models/brandModel');
const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

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
const getSingleBrand = asyncHandler(async (req, res, next) => {
    const brandId = req.params.id;
    const brand = await brandModel.findById({ "_id": brandId });

    if (!brand) {

        return next(new AppError(`Brand not found`, 404))

    } else {
        res.status(200).json({
            status: 'success',
            data: {
                brand
            }
        });
    }
});



//@desc create new brand
//@route POST /api/1/brands
//@access private
const createBrand = asyncHandler(async (req, res, next) => {
    const name = req.body.name;

    const brand = await brandModel.create({ name, slug: slugify(name) });
    res.status(201).json({
        status: 'success',
        data: {
            brand
        }
    })

})

//@desc update brand
//@route PUT /api/1/brands/:id
//@access private
const updateBrand = asyncHandler(async (req, res, next) => {
    const brandId = req.params.id;
    const name = req.body.name;
    const brand = await brandModel.findByIdAndUpdate(brandId, { name, slug: slugify(name) }, { new: true });
    if (!brand) {
        return next(new AppError(`Brand not found`, 404))
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                brand
            }
        });
    }
})

//desc delete brand
//@route DELETE /api/1/categories/:id
//@access private
const DeleteBrand = asyncHandler(async (req, res, next) => {
    const brandId = req.params.id;
    const brand = await brandModel.findByIdAndDelete(brandId);
    if (!brand) {
        return next(new AppError(`brand not found`, 404))
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                brand
            }
        });
    }
})







module.exports = {
    getBrands,
    createBrand,
    getSingleBrand,
    updateBrand,
    DeleteBrand
};