const router = require('express').Router();
const {
    addToWishlist,
    removeFromWishlist,
    getWishlist
     } = require('../controllers/wishlistController');


const {wishlistValidator,deleteWishlistValidator} = require('../utils/validations/wishlistValidator');

const authService = require('../controllers/authController')

// logged in user routes

router.use(authService.protect, authService.allowedTo('user'));


router.route('/')
    .get(getWishlist)
    .post(wishlistValidator,addToWishlist)

router.route('/:id')
    .delete(deleteWishlistValidator,removeFromWishlist)
    

module.exports = router; 
