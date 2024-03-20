const router = require('express').Router({ mergeParams: true });
const {
    updateReview,
    getReviews,
    createReview,
    getSingleReview,
    DeleteReview,
    createFilterObj,
    setProductIdAndUserIdToBody
} = require('../controllers/reviewController');
const {
    getReviewValidator,
    createReviewValidator,
    updateReviewValidator,
    deleteReviewValidator
} = require('../utils/validations/reviewValidator');

const authService = require('../controllers/authController')

router.route('/')

    .get(createFilterObj,getReviews)
    .post(authService.protect, authService.allowedTo('user'),setProductIdAndUserIdToBody, createReviewValidator, createReview)

router.route('/:id')
    .get(getReviewValidator, getSingleReview)
    .put(authService.protect, authService.allowedTo('user'),updateReviewValidator, updateReview)
    .delete(authService.protect, authService.allowedTo('admin', 'user', 'manager'),deleteReviewValidator, DeleteReview)





module.exports = router; 
