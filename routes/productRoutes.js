const router = require('express').Router();
const { updateProduct, getProducts, createProduct, getSingleProduct, DeleteProduct } = require('../controllers/productController');
const { getProductValidator, updateProductValidator, deleteProductValidator, createProductValidator } = require('../utils/validations/productValidator')




router.route('/')
    .get(getProducts)
    .post(createProductValidator, createProduct)

router.route('/:id')
    .get(getProductValidator, getSingleProduct)
    .put(updateProductValidator, updateProduct)
    .delete(deleteProductValidator, DeleteProduct)





module.exports = router; 
