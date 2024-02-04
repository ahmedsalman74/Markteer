const {check}=require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


exports.getBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    validatorMiddleware,
  ];

  exports.creatBrandValidator = [
    check('name').notEmpty().withMessage('Brand name is required')
    .isLength({min:3}).withMessage('too short Brand name')
    .isLength({max:30}).withMessage('too long Brand name'),
    validatorMiddleware

  ];

  exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    check('name').notEmpty().withMessage('Brand name is required')
    .isLength({min:3}).withMessage('too short Brand name')
    .isLength({max:30}).withMessage('too long Brand name'),
    
    validatorMiddleware

  ];

  exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    validatorMiddleware

  ];