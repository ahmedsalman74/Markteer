const express = require('express');
const router = require('express').Router();
const { updateCategory,getCategory, createCategory, getSingleCategory,DeleteCategory } = require('../controllers/categoryController');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const{getCategoryValidator,updateCategoryValidator,deleteCategoryValidator,creatCategoryValidator} = require('../utils/validations/categoryValidator')




router.route('/')
    .get(getCategory)
    .post(creatCategoryValidator,createCategory)

router.route('/:categoryid')
    .get(getCategoryValidator,getSingleCategory)
    .put(updateCategoryValidator,updateCategory)
    .delete(deleteCategoryValidator,DeleteCategory)





module.exports = router; 
