// Description: This file contains the logic for handling requests from the category routes.
const CategoryModel = require('../models/categoryModel');
const factory = require('./handlersFactory');

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
const DeleteCategory= factory.deleteOne(CategoryModel);







module.exports = {
    getCategory,
    createCategory,
    getSingleCategory,
    updateCategory,
    DeleteCategory
};