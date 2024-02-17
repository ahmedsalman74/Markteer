/* eslint-disable no-else-return */
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const CategoryModel = require('../models/categoryModel');
const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');
const factory = require('./handlersFactory');

//@desc get a list of categories
//@route GET /api/1/categories
//@access public
const getCategory = asyncHandler(async (req, res, next) => {
    //build query
    const documentCount = await CategoryModel.countDocuments();
    const ApiFeaturesInstance = new ApiFeatures(CategoryModel.find(), req.query)
        .paginate(documentCount)
        .filter()
        .search("Category") // Search after other transformations
        .sort() // Handle sorting before search
        .limitFields()
        ;
    //execute the query
    const { mongooseQuery, paginationResults } = ApiFeaturesInstance;
    const category = await mongooseQuery.exec();

    res.status(200).json({
        result: category.length,
        paginationResults,
        status: 'success',
        data: {
            category
        }
    })
})


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
const DeleteCategory= factory.deleteOne(CategoryModel);







module.exports = {
    getCategory,
    createCategory,
    getSingleCategory,
    updateCategory,
    DeleteCategory
};