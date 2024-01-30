const express = require('express');
const router = require('express').Router();
const { updateCategory,getCategory, createCategory, getSingleCategory,DeleteCategory } = require('../controllers/categoryController');




router.route('/')
    .get(getCategory)
    .post(createCategory)

router.route('/:categoryid')
    .get(getSingleCategory)
    .put(updateCategory)
    .delete(DeleteCategory)





module.exports = router;