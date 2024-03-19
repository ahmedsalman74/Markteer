/* eslint-disable no-else-return */

const asyncHandler = require('express-async-handler');
const reviewModel = require('../models/reviewModel');
const factory = require('./handlersFactory');



//@desc get a list of Reviews
//@route GET /api/1/Reviews
//@access public
const getReviews = factory.getAll(reviewModel)


//@desc get a single Review
//@route GET /api/1/Reviews/:id
//@access public
const getSingleReview = factory.getOne(reviewModel);

//@desc create new Review
//@route POST /api/1/Reviews
//@access protected/users
const createReview = factory.createOne(reviewModel);

//@desc update Review
//@route PUT /api/1/Reviews/:id
//@access protected/users
const updateReview = factory.updateOne(reviewModel)

//desc delete Review
//@route DELETE /api/1/categories/:id
//@access protected/users/admin/mangers

const DeleteReview = factory.deleteOne(reviewModel);






module.exports = {
    getReviews,
    createReview,
    getSingleReview,
    updateReview,
    DeleteReview,
    
};