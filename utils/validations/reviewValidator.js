const { check, body } = require('express-validator')
const slugify = require('slugify'); // Import the 'slugify' function
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Review = require('../../models/reviewModel');

exports.createReviewValidator = [
    check('title').notEmpty().withMessage('Title is required')
        .isLength({ min: 3 }).withMessage('Title short review')
        .isLength({ max: 30 }).withMessage('Title long review').custom((val, { req }) => {
            req.body.slug = slugify(val); // Use the 'slugify' function
            return true;
        }),

    check('description').notEmpty().withMessage('Review Description is required')
        .isLength({ min: 3 }).withMessage('Description too short review')
        .isLength({ max: 1000 }).withMessage('Description too long review') ,
    check('rating').notEmpty().withMessage('Rating is required')
        .isNumeric().withMessage('Rating must be a number')
        .isIn([1, 2, 3, 4, 5]).withMessage('Rating must be between 1 to 5'),

        check('user').isMongoId().withMessage('Invalid Review id format'),
  check('product')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom((val, { req }) =>
      // Check if logged user create review before
      Review.findOne({ user: req.user._id, product: req.body.product }).then(
        (review) => {
          console.log(review);
          if (review) {
            return Promise.reject(
              new Error('You already created a review before')
            );
          }
        }
      )
    ),
    validatorMiddleware
];

exports.updateReviewValidator = [
    check('id')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom((val, { req }) =>
      // Check review ownership before update
      Review.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error(`There is no review with id ${val}`));
        }

        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error(`Your are not allowed to perform this action`)
          );
        }
      })
    ),
  validatorMiddleware,

];

exports.getReviewValidator = [
    check('id').isMongoId().withMessage('Invalid Review id format'),
    validatorMiddleware,
];

exports.deleteReviewValidator = [
    check('id')
      .isMongoId()
      .withMessage('Invalid Review id format')
      .custom((val, { req }) => {
        // Check review ownership before update
        if (req.user.role === 'user') {
          return Review.findById(val).then((review) => {
            if (!review) {
              return Promise.reject(
                new Error(`There is no review with id ${val}`)
              );
            }
            if (review.user._id.toString() !== req.user._id.toString()) {
              return Promise.reject(
                new Error(`Your are not allowed to perform this action`)
              );
            }
          });
        }
        return true;
      }),
    validatorMiddleware,
  ];