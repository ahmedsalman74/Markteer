const {check, body }=require('express-validator')
const slugify = require('slugify'); // Import the 'slugify' function
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


exports.getBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    validatorMiddleware,
  ];

  exports.creatBrandValidator = [
    check('name').notEmpty().withMessage('Brand name is required')
    .isLength({min:3}).withMessage('too short Brand name')
    .isLength({max:30}).withMessage('too long Brand name'),
    body('name').custom((val, { req }) => {
      req.body.slug = slugify(val); // Use the 'slugify' function
      return true;
    }),

    validatorMiddleware

  ];

  exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    body('name').custom((val, { req }) => {
      req.body.slug = slugify(val); // Use the 'slugify' function
      return true;
    }),

    check('name').notEmpty().withMessage('Brand name is required')
      .isLength({ min: 3 }).withMessage('too short Brand name')
      .isLength({ max: 30 }).withMessage('too long Brand name'),

    validatorMiddleware

  ];

  exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    validatorMiddleware

  ];