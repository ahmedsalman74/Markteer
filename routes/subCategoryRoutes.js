const express = require('express');
const router = require('express').Router({ mergeParams: true });
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const {
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdToBody,
    createFilteredObject } = require('../controllers/subCategoryController');

const { creatSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator } = require('../utils/validations/subCategoryValidator')

router.route('/')
    .get(createFilteredObject, getSubCategories)
    .post(setCategoryIdToBody, creatSubCategoryValidator, createSubCategory)


router.route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory)


module.exports = router;