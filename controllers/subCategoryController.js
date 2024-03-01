// Description: This file contains the subCategory controller.
const subCategoryModel = require('../models/subCategoryModel');
const factory = require('./handlersFactory');


const setCategoryIdToBody = (req, res, next) => {
    // Nested route
    if (!req.body.category) req.body.category = req.params.id;
    next();
  };
  
//@desc create new subCategory
//@route POST /api/v1/subcategories
//@access private
const createSubCategory = factory.createOne(subCategoryModel);


// Create a filtered object to be used in the query

const createFilteredObject = (req, res, next) => {
    let filteredObject = {};
    if (req.params.id) filteredObject = { category: req.params.id };
    req.filteredObject = filteredObject;
    next()
}

//desc get subCategories
//@route GET /api/v1/subcategories
//@access public

const getSubCategories =factory.getAll(subCategoryModel);


//desc get single subCategory
//@route GET /api/v1/subcategories/:id
//@access public
const getSubCategory = factory.createOne(subCategoryModel);




//desc update subCategory
//@route put /api/v1/subcategories/:id

const updateSubCategory = factory.updateOne(subCategoryModel)



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