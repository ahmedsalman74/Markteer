const router = require('express').Router();
const {
    createOrder,
    filterOrderForLoggedUser,
    findAllOrders,
    findSpecificOrder
} = require('../controllers/orderController');
const authService = require('../controllers/authController')

const { createOrderValidator } = require('../utils/validations/orderValidator')
// logged in user routes

router.use(authService.protect);


router.route('/')
    .get(authService.protect,authService.allowedTo('user','admin', 'manager'), filterOrderForLoggedUser, findAllOrders)


router.route('/:cartId')
    .post(createOrderValidator, createOrder)


router.route('/:id')
    .get(findSpecificOrder)



module.exports = router; 
