const router = require('express').Router();
const {
    addProductToCart,
    getLoggedUserCart,
    removeSpecificCartItem,
    clearCart,
    updateCartItemQuantity, 
    applyCoupon
} = require('../controllers/cartController');
const{addToCartValidator} = require('../utils/validations/cartValidator')

const authService = require('../controllers/authController')

router.use(authService.protect, authService.allowedTo('user'))
router.route('/')
    .get(getLoggedUserCart)
    .post(addToCartValidator,addProductToCart)
    .delete(clearCart)

router.put('/applyCoupon', applyCoupon)
router.route('/:itemId')
    .delete(removeSpecificCartItem)
    .put(updateCartItemQuantity)



module.exports = router; 
