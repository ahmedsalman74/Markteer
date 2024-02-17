const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const subCategoryModel = require('../models/subCategoryModel');
const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');
const factory = require('./handelersFactory');


const setCategoryIdToBody = (req, res, next) => {
    // Nested route
    if (!req.body.category) req.body.category = req.params.id;
    next();
  };
//@desc create new subCategory
//@route POST /api/v1/subcategories
//@access private
const createSubCategory = asyncHandler(async (req, res, next) => {
    
    const { name, category } = req.body;

    const subCategories = await subCategoryModel.create({
        name,
        slug: slugify(name),
        category
    });
    res.status(201).json({
        status: 'success',
        data: {
            subCategories
        }
    })

})

const createFilteredObject = (req, res, next) => {
    let filteredObject = {};
    if (req.params.id) filteredObject = { category: req.params.id };
    req.filteredObject = filteredObject;
    next()
}

//desc get subCategories
//@route GET /api/v1/subcategories
//@access public

const getSubCategories = asyncHandler(async (req, res, next) => {
    //build query
    const documentCount = await subCategoryModel.countDocuments();
    const ApiFeaturesInstance = new ApiFeatures(subCategoryModel.find(), req.query)
        .paginate(documentCount)
        .filter()
        .search("subCategory") // Search after other transformations
        .sort() // Handle sorting before search
        .limitFields()
        ;
    //execute the query
    const { mongooseQuery, paginationResults } = ApiFeaturesInstance;
    const subCategories = await mongooseQuery.exec();



    res.status(200).json({
        result: subCategories.length,
        paginationResults,
        status: 'success',
        data: {
            subCategories
        }
    })
})
//desc get single subCategory
//@route GET /api/v1/subcategories/:id
//@access public
const getSubCategory = asyncHandler(async (req, res, next) => {
    const subcategoryId = req.params.id;
    const subCategory = await subCategoryModel.findById({ "_id": subcategoryId });

    if (!subCategory) {

        return next(new AppError(`subCategory not found`, 404))

    } 
        res.status(200).json({
            status: 'success',
            data: {
                subCategory
            }
        });
    
});

//desc update subCategory
//@route put /api/v1/subcategories/:id

const updateSubCategory = asyncHandler(async (req, res, next) => {
    const subcategoryId = req.params.id;
    const { name, category } = req.body;
    const SubCategory = await subCategoryModel.findByIdAndUpdate({ "_id": subcategoryId },
        { name, category, slug: slugify(name) },
        { new: true, runValidators: true });

    if (!SubCategory) {

        return next(new AppError(`subCategory not found`, 404))

    } 
        res.status(200).json({
            status: 'success',
            data: {
                SubCategory
            }
        });
    
});
//desc delete usbCategory
//@route DELETE /api/1/subcategory/:id
//@access private
const deleteSubCategory = factory.deleteOne(subCategoryModel);


module.exports = {
    setCategoryIdToBody,
    createFilteredObject,
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}