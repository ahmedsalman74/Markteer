
const { check } = require('express-validator');
const moment = require('moment');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createCouponValidator = [
    check('code').notEmpty().withMessage('Coupon code is required')
        .custom((val, { req }) => {
            req.body.code = val.toString().toUpperCase(); // Convert to uppercase
            return true;
        }),
    check('discount')
        .notEmpty().withMessage('Discount is required')
        .isInt().withMessage('Discount must be a number'),

    check('expiry').notEmpty().withMessage('Expiry date is required').custom(value => {
        const uppercaseValue = value.toUpperCase(); // Convert to uppercase
        if (!moment(uppercaseValue, 'MM/DD/YYYY', true).isValid()) { // Check if the date is valid in 'MM/DD/YYYY' format
            throw new Error('Expiry date must be in the format MM/DD/YYYY');
        }
        return true;
    }),
    validatorMiddleware,
];

exports.updateCouponValidator = [
    check('code').optional()
        .custom((val, { req }) => {
            req.body.code = val.toString().toUpperCase(); // Convert to uppercase
            return true;
        }),
    check('discount')
        .optional()
        .isInt().withMessage('Discount must be a number'),

    check('expiry').optional()
        .custom(value => {
            const uppercaseValue = value.toUpperCase(); // Convert to uppercase
            if (!moment(uppercaseValue, 'MM/DD/YYYY', true).isValid()) { // Check if the date is valid in 'MM/DD/YYYY' format
                throw new Error('Expiry date must be in the format MM/DD/YYYY');
            }
            return true;
        }),

    validatorMiddleware,
];

exports.deleteCouponValidator = [
    check('id').isMongoId().withMessage('Invalid Coupon id format'),
    validatorMiddleware,
];
