const router = require('express').Router();
const {
    updateReview,
    getReviews,
    createReview,
    getSingleReview,
    DeleteReview,
} = require('../controllers/reviewController');
const {
    getReviewValidator,
    createReviewValidator,
    updateReviewValidator,
    deleteReviewValidator
} = require('../utils/validations/reviewValidator');

const authService = require('../controllers/authController')

router.route('/')
    .get(getReviews)
    .post(authService.protect, authService.allowedTo('user'), createReviewValidator, createReview)

router.route('/:id')
    .get(getReviewValidator, getSingleReview)
    .put(authService.protect, authService.allowedTo('user'),updateReviewValidator, updateReview)
    .delete(authService.protect, authService.allowedTo('admin', 'user', 'manager'),deleteReviewValidator, DeleteReview)





module.exports = router; 
