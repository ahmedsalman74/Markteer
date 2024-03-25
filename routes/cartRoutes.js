const router = require('express').Router();
const {
    addProductToCart } = require('../controllers/cartController');


const authService = require('../controllers/authController')

router.use(authService.protect,authService.allowedTo('user'))
router.route('/')
   
    .post(addProductToCart)

router.route('/:id')
    .get()
    


module.exports = router; 
