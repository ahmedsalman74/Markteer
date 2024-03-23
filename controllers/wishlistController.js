const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');


//@desc add product to wishlist
//@route POST /api/v1/wishlist/:productId
//@access private
const addToWishlist = asyncHandler(async (req, res, next) => {
    // $addToSet => add productId to wishlist array if productId not exist
    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: { wishlist: req.body.productId },
        },
        { new: true }
    );

    res.status(200).json({
        status: 'success',
        message: 'Product added successfully to your wishlist.',
        data: user.wishlist,
    });
});

//@desc remove product from wishlist
//@route DELETE /api/v1/wishlist/:productId
//@access private
const removeFromWishlist = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate(req.user._id, {
        $pull: { wishlist: req.params.productId },
    }, { new: true });
    res.status(200).json({
        status: 'success',
        message: 'Product removed successfully to your wishlist.',
        data: user.wishlist,
    });
});

//@desc get wishlist for user
const getWishlist = asyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.user._id).populate('wishlist');
    res.status(200).json({
        status: 'success',
        results: user.wishlist.length,
        data: user.wishlist,
    });
});
module.exports = {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
};
