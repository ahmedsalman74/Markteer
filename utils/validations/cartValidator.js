
const { check } = require('express-validator');
const productModel = require('../../models/productModel');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.addToCartValidator = [
    check('productId').notEmpty().withMessage('Product ID is required')
    .custom(async (productId, { req }) => {
        const product = await productModel.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        if (product.quantity <= 0) {
            throw new Error('Product is out of stock');
        }
    }).withMessage('Invalid product or out of stock'),
    validatorMiddleware,
];


exports.deleteOrderValidator = [
    check('orderId').isMongoId().withMessage('Invalid Order ID format'),
    validatorMiddleware,
];
