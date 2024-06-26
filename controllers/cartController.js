
const asyncHandler = require('express-async-handler');

const cartModel = require('../models/cartModel');

const AppError = require('../utils/appError');
const productModel = require('../models/productModel');
const couponModel = require('../models/couponModel');



// Calculate total cart price
const calcTotalCartPrice = (cart) => {
    let totalPrice = 0;
    cart.cartItems.forEach((item) => {
        totalPrice += item.quantity * item.price;
    });
    cart.totalCartPrice = totalPrice;
    cart.totalPriceAfterDiscount = undefined;
    return totalPrice;
};


// @desc    Add product to chart
// @route   POST /api/v1/chart
// @access  privet /user


const addProductToCart = asyncHandler(async (req, res, next) => {
    const { productId, color } = req.body;
    // check if product is available and quantity is enough
    const product = await productModel.findById(productId);
    if (product.quantity <= 0) {
        return next(new AppError('Product is out of stock', 400));
    }

    // 1) Get Cart for logged user
    let cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
        // create cart fot logged user with product
        cart = await cartModel.create({
            user: req.user._id,
            cartitem: [{
                color,
                price: product.price,
            }],
        });
    }
    else {


        // 2) Check if product is already in cart increase quantity
        const productIndex = cart.cartItems.findIndex(
            (item) => item.product.toString() === productId && item.color === color
        );

        if (productIndex > -1) {
            const cartItem = cart.cartItems[productIndex];
            cartItem.quantity += 1;
            cart.cartItems[productIndex] = cartItem;
            
        } else {
            // product not exist in cart,  push product to cartItems array
            cart.cartItems.push({ product: productId, color, price: product.price });
        }

    }
    // Calculate total cart price
    calcTotalCartPrice(cart);
    await cart.save();

    res.status(200).json({
        status: 'success',
        message: 'Product added to cart successfully',
        numOfCartItems: cart.cartItems.length,
        data: cart,

    });
});


// @desc    get logged user chart
// @route   Get /api/v1/chart
// @access  privet /user


const getLoggedUserCart = asyncHandler(async (req, res, next) => {
    const cart = await cartModel.findOne({ user: req.user._id });

    if (!cart) {
        return next(
            new AppError(`There is no cart for this user id : ${req.user._id}`, 404)
        );
    }

    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

// @desc    Remove specific cart item
// @route   DELETE /api/v1/cart/:itemId
// @access  Private/User
const removeSpecificCartItem = asyncHandler(async (req, res, next) => {
    const cart = await cartModel.findOneAndUpdate(
        { user: req.user._id },
        {
            $pull: { cartItems: { _id: req.params.itemId } },
        },
        { new: true }
    );

    calcTotalCartPrice(cart);
    cart.save();

    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

// @desc    clear logged user cart
// @route   DELETE /api/v1/cart
// @access  Private/User
const clearCart = asyncHandler(async (req, res, next) => {
    await cartModel.findOneAndDelete({ user: req.user._id });
    res.status(204).send();
});

// @desc    update logged user chart
// @route   PUT /api/v1/chart
// @access  privet /user

const updateCartItemQuantity = asyncHandler(async (req, res, next) => {
    const { quantity } = req.body

    const cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
        return next(new AppError(`There is no cart for this user id : ${req.user._id}`, 404));
    }
    const indexItem = cart.cartItems.findIndex((item) => item._id.toString() === req.params.itemId);
    if (indexItem > -1) {
        cart.cartItems[indexItem].quantity = quantity;

    } else {
        return next(new AppError(`There is no item with this id : ${req.params.itemId}`, 404));

    }
    calcTotalCartPrice(cart);

    await cart.save();

    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

// @desc    Apply coupon on logged user cart 
// @route   PUT /api/v1/cart/applyCoupon
// @access  Private/User
const applyCoupon = asyncHandler(async (req, res, next) => {


    //1) find the coupon code and check if it is valid
    const coupon = await couponModel.findOne({
        code: req.body.coupon,
        expiry: { $gt: Date.now() },
    });

    if (!coupon) {
        return next(new AppError(`Coupon is invalid or expired`));
    }

    //2) get the cart for the logged user
    const cart = await cartModel.findOne({ user: req.user._id });
    const totalPrice = cart.totalCartPrice;

    //3) calculate the total price after discount
    const discountPrice = (totalPrice * (coupon.discount / 100)).toFixed(2);
    cart.totalPriceAfterDiscount = totalPrice - discountPrice;
    await cart.save();


    res.status(200).json({
        status: 'success',
        message: 'Coupon applied successfully',
        data: cart,
        discountRate: `${coupon.discount}%`,
    });
});

module.exports = {
    addProductToCart,
    getLoggedUserCart,
    removeSpecificCartItem,
    clearCart,
    updateCartItemQuantity,
    applyCoupon

};