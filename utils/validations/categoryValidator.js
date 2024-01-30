const {check}=require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


exports.getCategoryValidator = [
    check('categoryid').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
  ];

  exports.creatCategoryValidator = [
    check('name').notEmpty().withMessage('Category name is required')
    .isLength({min:3}).withMessage('too short category name')
    .isLength({max:30}).withMessage('too long category name'),
    validatorMiddleware

  ];

  exports.updateCategoryValidator = [
    check('categoryid').isMongoId().withMessage('Invalid category id format'),
    check('name').notEmpty().withMessage('Category name is required')
    .isLength({min:3}).withMessage('too short category name')
    .isLength({max:30}).withMessage('too long category name'),
    
    validatorMiddleware

  ];

  exports.deleteCategoryValidator = [
    check('categoryid').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware

  ];