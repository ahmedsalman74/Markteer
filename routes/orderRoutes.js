const router = require('express').Router();
const {
    createOrder
     } = require('../controllers/orderController');
const authService = require('../controllers/authController')

const {createOrderValidator} = require('../utils/validations/orderValidator')
// logged in user routes

router.use(authService.protect, authService.allowedTo('user'));


router.route('/')
    .get()
    

router.route('/:cartId')
    .post(createOrderValidator,createOrder)
    

module.exports = router; 
