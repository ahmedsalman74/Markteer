const subCategory = require('../models/subCategoryModel');
const ascyncWatpper = require('../middlewares/ascyncWarpper');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const AppError = require('../utils/appError');



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

    const subCategories = await subCategory.create({
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
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    console.log(req.params.id);
    
    const subCategories = await subCategory.find(req.filteredObject, { "__v": false })
        .limit(limit)
        .skip(skip)
    // .populate({
    //     path: 'category',
    //     select: "name -_id"
    // });


    res.status(200).json({
        result: subCategories.length,
        page: page,
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
    const Sub_Category = await subCategory.findById({ "_id": subcategoryId });

    if (!Sub_Category) {

        return next(new AppError(`subCategory not found`, 404))

    } else {
        res.status(200).json({
            status: 'success',
            data: {
                Sub_Category
            }
        });
    }
});

//desc update subCategory
//@route put /api/v1/subcategories/:id

const updateSubCategory = asyncHandler(async (req, res, next) => {
    const subcategoryId = req.params.id;
    const { name, category } = req.body;
    const Sub_Category = await subCategory.findByIdAndUpdate({ "_id": subcategoryId },
        { name, category, slug: slugify(name) },
        { new: true, runValidators: true });

    if (!Sub_Category) {

        return next(new AppError(`subCategory not found`, 404))

    } else {
        res.status(200).json({
            status: 'success',
            data: {
                Sub_Category
            }
        });
    }
});
//desc delete usbCategory
//@route DELETE /api/1/subcategory/:id
//@access private
const deleteSubCategory = asyncHandler(async (req, res, next) => {
    const subcategoryId = req.params.id;
    const Subcategory = await subCategory.findByIdAndDelete(subcategoryId);
    if (!Subcategory) {
        return next(new AppError(`Subcategory not found`, 404))
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                Subcategory
            }
        });
    }
})



module.exports = {
    setCategoryIdToBody,
    createFilteredObject,
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}