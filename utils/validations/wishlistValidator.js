const { check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.wishlistValidator = [
    check('productId').isMongoId().withMessage('Invalid Product id format'),
    validatorMiddleware,
    ];

exports.deleteWishlistValidator = [
    check('productId').isMongoId().withMessage('Invalid Product id format'),
    validatorMiddleware,
    ];