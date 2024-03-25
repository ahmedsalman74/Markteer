const router = require('express').Router();
const {
    addProductToCart,
    getLoggedUserCart,
    removeSpecificCartItem,
    clearCart,
    updateCartItemQuantity, 
    applyCoupon
} = require('../controllers/cartController');


const authService = require('../controllers/authController')

router.use(authService.protect, authService.allowedTo('user'))
router.route('/')
    .get(getLoggedUserCart)
    .post(addProductToCart)
    .delete(clearCart)

router.put('/applyCoupon', applyCoupon)
router.route('/:itemId')
    .delete(removeSpecificCartItem)
    .put(updateCartItemQuantity)



module.exports = router; 
