const router = require('express').Router();
const {
    updateBrand,
    getBrands,
    createBrand,
    getSingleBrand,
    DeleteBrand,
    uploadBrandImage,
    resizeImage } = require('../controllers/brandController');

const {
    getBrandValidator,
    updateBrandValidator,
    deleteBrandValidator,
    creatBrandValidator } = require('../utils/validations/brandValidator')
const authService = require('../controllers/authController')

router.route('/')
    .get(getBrands)
    .post(authService.protect,authService.allowedTo('admin', 'manager'),uploadBrandImage, resizeImage, creatBrandValidator, createBrand)

router.route('/:id')
    .get(getBrandValidator, getSingleBrand)
    .put(authService.protect,authService.allowedTo('admin', 'manager'),uploadBrandImage, resizeImage, updateBrandValidator, updateBrand)
    .delete(authService.protect,authService.allowedTo('admin'),deleteBrandValidator, DeleteBrand)





module.exports = router; 
