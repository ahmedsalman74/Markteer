const {check}=require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
  ];

  exports.creatCategoryValidator = [
    check('name').notEmpty().withMessage('Category name is required')
    .isLength({min:3}).withMessage('too short category name')
    .isLength({max:30}).withMessage('too long category name'),
    validatorMiddleware

  ];

  exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    check('name').notEmpty().withMessage('Category name is required')
    .isLength({min:3}).withMessage('too short category name')
    .isLength({max:30}).withMessage('too long category name'),
    
    validatorMiddleware

  ];

  exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware

  ];