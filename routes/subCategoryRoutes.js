const express = require('express');
const router = require('express').Router();
const { createSubCategory, getSubCategories, getSubCategory,updateSubCategory,deleteSubCategory } = require('../controllers/subCategoryController');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const { creatSubCategoryValidator,getSubCategoryValidator,updateSubCategoryValidator,deleteSubCategoryValidator } = require('../utils/validations/subCategoryValidator')

router.route('/')
    .get(getSubCategories)
    .post(creatSubCategoryValidator, createSubCategory)


router.route('/:id')
.get(getSubCategoryValidator,getSubCategory)
.put(updateSubCategoryValidator,updateSubCategory)
.delete(deleteSubCategoryValidator,deleteSubCategory)


module.exports = router;