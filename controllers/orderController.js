const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

const Product = require('../models/productModel');

const AppError = require('../utils/appError');

// @desc create new order
// @route POST /api/v1/orders
// @access protected/user

const createOrder = asyncHandler(async (req, res, next) => {
    //1) get cart depend on cartId
    const cart = await Cart.findById(req.body.cartId);
    if (!cart) {
        return next(new AppError('Cart not found', 404));
    }

    //2) get order price dependent on cart price "check" if coupon applied
    const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice;
    const totalOrderPrice = cartPrice + cart.taxPrice + cart.shippingPrice;
    //3) create order with default paymentMethodType: cash
    const order = await Order.create({
        user: req.user._id,
        cartItems: cart.cartItems,
        taxPrice: cart.taxPrice,
        shippingAddress: cart.shippingAddress,
        shippingPrice: cart.shippingPrice,
        totalOrderPrice,
    });
    //4) after creating order decreaces ordered product increment product sold
    if (order) {
        const blukOption = cart.cartItems.map((item) => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
            },
        }));
        await Product.bulkWrite(blukOption, {});
        //5) clear cart depend on cartId
        await cart.findByIdAndDelete(req.params.cartId);

    }
    res.status(201).json({
        status: 'success',
        data: {
            order,
        },
    });

});



module.exports = {
    createOrder,
};