
const asyncHandler = require('express-async-handler');

const cartModel = require('../models/cartModel');

const AppError = require('../utils/appError');
const productModel = require('../models/productModel');




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

    const product = await productModel.findById(productId);
    
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

module.exports = { addProductToCart };