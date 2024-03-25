const router = require('express').Router();
const {
    addProductToCart,
    getLoggedUserCart,
    removeSpecificCartItem,
    clearCart,
    updateCartItemQuantity
} = require('../controllers/cartController');


const authService = require('../controllers/authController')

router.use(authService.protect, authService.allowedTo('user'))
router.route('/')
    .get(getLoggedUserCart)
    .post(addProductToCart)
    .delete(clearCart)

router.route('/:itemId')
    .delete(removeSpecificCartItem)
    .put(updateCartItemQuantity)



module.exports = router; 
