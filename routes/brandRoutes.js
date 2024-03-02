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


router.route('/')
    .get(getBrands)
    .post(uploadBrandImage,resizeImage,creatBrandValidator, createBrand)

router.route('/:id')
    .get(getBrandValidator, getSingleBrand)
    .put(uploadBrandImage,resizeImage,updateBrandValidator, updateBrand)
    .delete(deleteBrandValidator, DeleteBrand)





module.exports = router; 
