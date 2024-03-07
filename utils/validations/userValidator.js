const { check, body } = require('express-validator')
const slugify = require('slugify'); // Import the 'slugify' function
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


exports.getUserValidator = [
  check('id').isMongoId().withMessage('Invalid User id format'),
  validatorMiddleware,
];

exports.creatUserValidator = [
  check('name').notEmpty().withMessage('User name is required')
    .isLength({ min: 3 }).withMessage('too short User name')
    .isLength({ max: 30 }).withMessage('too long User name'),
  body('name').custom((val, { req }) => {
    req.body.slug = slugify(val); // Use the 'slugify' function
    return true;
  }),

  check('email').notEmpty().withMessage(' email is required').isEmail('email is required by default'), 
  validatorMiddleware

];

exports.updateUserValidator = [
  check('id').isMongoId().withMessage('Invalid User id format'),
  body('name').optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val); // Use the 'slugify' function
      return true;
    }),

  check('name').notEmpty().withMessage('User name is required')
    .isLength({ min: 3 }).withMessage('too short User name')
    .isLength({ max: 30 }).withMessage('too long User name'),

  validatorMiddleware

];

exports.deleteUserValidator = [
  check('id').isMongoId().withMessage('Invalid User id format'),
  validatorMiddleware

];