/* eslint-disable no-else-return */

const reviewModel = require('../models/reviewModel');
const factory = require('./handlersFactory');



const setProductIdAndUserIdToBody = (req, res, next) => {
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.user._id;
    next();
  };
  
// Create a filtered object to be used in the query

const createFilterObj = (req, res, next) => {
    let filterObject = {};
    if (req.params.productId) filterObject = { product: req.params.productId };
    req.filterObj = filterObject;
    next();
  };

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
    setProductIdAndUserIdToBody,
    createFilterObj
    
};