// Description: It contains all the functions to handle requests related to Coupons.
const couponModel = require('../models/couponModel');
const factory = require('./handlersFactory'); // Import the 'factory' module


//@desc get a list of Coupons
//@route GET /api/1/Coupons
//@access public
const getCoupons = factory.getAll(couponModel)


//@desc get a single Coupon
//@route GET /api/1/Coupons/:id
//@access public
const getSingleCoupon = factory.getOne(couponModel);

//@desc create new Coupon
//@route POST /api/1/Coupons
//@access private
const createCoupon = factory.createOne(couponModel);

//@desc update Coupon
//@route PUT /api/1/Coupons/:id
//@access private
const updateCoupon = factory.updateOne(couponModel)

//desc delete Coupon
//@route DELETE /api/1/categories/:id
//@access private

const DeleteCoupon = factory.deleteOne(couponModel);





module.exports = {
    getCoupons,
    createCoupon,
    getSingleCoupon,
    updateCoupon,
    DeleteCoupon
}