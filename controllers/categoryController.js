const CategoryModel = require('../models/categoryModel');
const ascyncWatpper = require('../middlewares/ascyncWarpper');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const AppError = require('../utils/appError');

//@desc get a list of categories
//@route GET /api/1/categories
//@access public
const getCategory = asyncHandler(async (req, res, next) => {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const category = await CategoryModel.find({}, { "__v": false }).limit(limit).skip(skip);;
    res.status(200).json({
        result: category.length,
        status: 'success',
        data: {
            category
        }
    })
})


//@desc get a single category
//@route GET /api/1/categories/:id
//@access public
const getSingleCategory = asyncHandler(async (req, res, next) => {
    const categoryId = req.params.id;
    const category = await CategoryModel.findById({ "_id": categoryId });

    if (!category) {

        return next(new AppError(`Category not found`, 404))

    } else {
        res.status(200).json({
            status: 'success',
            data: {
                category
            }
        });
    }
});



//@desc create new category
//@route POST /api/1/categories
//@access private
const createCategory = asyncHandler(async (req, res, next) => {
    const name = req.body.name;

    const category = await CategoryModel.create({ name, slug: slugify(name) });
    res.status(201).json({
        status: 'success',
        data: {
            category
        }
    })

})

//@desc update category
//@route PUT /api/1/categories/:id
//@access private
const updateCategory = asyncHandler(async (req, res, next) => {
    const categoryId = req.params.id;
    const name = req.body.name;
    const category = await CategoryModel.findByIdAndUpdate(categoryId, { name, slug: slugify(name) }, { new: true });
    if (!category) {
        return next(new AppError(`Category not found`, 404))
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                category
            }
        });
    }
})

//desc delete category
//@route DELETE /api/1/categories/:id
//@access private
const DeleteCategory = asyncHandler(async (req, res, next) => {
    const categoryId = req.params.id;
    const category = await CategoryModel.findByIdAndDelete(categoryId);
    if (!category) {
        return next(new AppError(`Category not found`, 404))
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                category
            }
        });
    }
})







module.exports = {
    getCategory,
    createCategory,
    getSingleCategory,
    updateCategory,
    DeleteCategory
};