const {check}=require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validatorMiddleware,
  ];

  exports.creatSubCategoryValidator = [
    check('name').notEmpty().withMessage('SubCategory name is required')
    .isLength({min:2}).withMessage('too short Subcategory name')
    .isLength({max:30}).withMessage('too long Subcategory name'),
    check('category')
    .notEmpty().withMessage('subCategory must belong to category')
    .isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware

  ];

  exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    check('name').notEmpty().withMessage('SubCategory name is required')
    .isLength({min:3}).withMessage('too short Subcategory name')
    .isLength({max:30}).withMessage('too long Subcategory name'),
    
    validatorMiddleware

  ];

  exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validatorMiddleware

  ];