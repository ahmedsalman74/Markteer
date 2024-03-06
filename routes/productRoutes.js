const router = require('express').Router();
const { updateProduct, getProducts, createProduct, getSingleProduct, DeleteProduct ,uploadMultiImages, resizeMultiImages } = require('../controllers/productController');
const { getProductValidator, updateProductValidator, deleteProductValidator, createProductValidator } = require('../utils/validations/productValidator')




router.route('/')
    .get(getProducts)
    .post(uploadMultiImages, resizeMultiImages ,createProductValidator, createProduct)

router.route('/:id')
    .get(getProductValidator, getSingleProduct)
    .put(updateProductValidator, updateProduct)
    .delete(deleteProductValidator, DeleteProduct)





module.exports = router; 
