const router = require('express').Router();
const {
    updateReview,
    getReviews,
    createReview,
    getSingleReview,
    DeleteReview,
} = require('../controllers/reviewController');


const authService = require('../controllers/authController')

router.route('/')
    .get(getReviews)
    .post(authService.protect, authService.allowedTo('user'), createReview)

router.route('/:id')
    .get( getSingleReview)
    .put(authService.protect, authService.allowedTo('user'), updateReview)
    .delete(authService.protect, authService.allowedTo('admin','user','manager'), DeleteReview)





module.exports = router; 
