const router = require('express').Router();
const {
    addProductToCart,
    getLoggedUserCart 
} = require('../controllers/cartController');


const authService = require('../controllers/authController')

router.use(authService.protect,authService.allowedTo('user'))
router.route('/')
   .get(getLoggedUserCart)
    .post(addProductToCart)

router.route('/:id')
    .get()
    


module.exports = router; 
