const {check, body}=require('express-validator')
const slugify = require('slugify'); // Import the 'slugify' function
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
  ];

  exports.creatCategoryValidator = [
    check('name').notEmpty().withMessage('Category name is required')
    .isLength({min:3}).withMessage('too short category name')
    .isLength({max:30}).withMessage('too long category name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val); // Use the 'slugify' function
      return true;
    }),
    validatorMiddleware

  ];

  exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    body('name').optional().custom((val, { req }) => {
      req.body.slug = slugify(val); // Use the 'slugify' function
      return true;
    }),

    check('name').notEmpty().withMessage('Category name is required')
    .isLength({min:3}).withMessage('too short category name')
    .isLength({max:30}).withMessage('too long category name'),
    
    validatorMiddleware

  ];

  exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware

  ];