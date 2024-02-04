const express = require('express');
const router = require('express').Router();
const { updateBrand, getBrands, createBrand, getSingleBrand, DeleteBrand } = require('../controllers/brandController');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const { getBrandValidator, updateBrandValidator, deleteBrandValidator, creatBrandValidator } = require('../utils/validations/brandValidator')


router.route('/')
    .get(getBrands)
    .post(creatBrandValidator, createBrand)

router.route('/:id')
    .get(getBrandValidator, getSingleBrand)
    .put(updateBrandValidator, updateBrand)
    .delete(deleteBrandValidator, DeleteBrand)





module.exports = router; 
