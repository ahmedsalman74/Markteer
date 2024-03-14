const router = require('express').Router();
const { updateProduct, getProducts, createProduct, getSingleProduct, DeleteProduct ,uploadMultiImages, resizeMultiImages } = require('../controllers/productController');
const { getProductValidator, updateProductValidator, deleteProductValidator, createProductValidator } = require('../utils/validations/productValidator')


const authService = require('../controllers/authController')

router.route('/')
    .get(getProducts)
    .post(authService.protect,authService.allowedTo('admin', 'manager'),uploadMultiImages, resizeMultiImages ,createProductValidator, createProduct)

router.route('/:id')
    .get(getProductValidator, getSingleProduct)
    .put(authService.protect,authService.allowedTo('admin', 'manager'),updateProductValidator, updateProduct)
    .delete(authService.protect,authService.allowedTo('admin'),deleteProductValidator, DeleteProduct)





module.exports = router; 
