
const { check } = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createOrderValidator = [
    check('cartId').notEmpty().withMessage('Cart ID is required'),
    check('shippingAddress').notEmpty().withMessage('Shipping address is required'),
    validatorMiddleware,
];

exports.updateOrderValidator = [
    // Define validators for updating order if needed
];

exports.deleteOrderValidator = [
    check('orderId').isMongoId().withMessage('Invalid Order ID format'),
    validatorMiddleware,
];
