const router = require('express').Router();
const {
    addToWishlist,
    removeFromWishlist,
    getWishlist
     } = require('../controllers/wishlistController');



const authService = require('../controllers/authController')

// logged in user routes

router.use(authService.protect, authService.allowedTo('user'));


router.route('/')
    .get(getWishlist)
    .post(addToWishlist)

router.route('/:id')
    .delete(removeFromWishlist)
    

module.exports = router; 
