const router = require('express').Router();
const {
    createOrder,
    filterOrderForLoggedUser,
    findAllOrders,
    findSpecificOrder,
    updateOrderToPaid,
    updateOrderToDelivered
} = require('../controllers/orderController');
const authService = require('../controllers/authController')

const { createOrderValidator } = require('../utils/validations/orderValidator')
// logged in user routes

router.use(authService.protect);


router.route('/')
    .get(authService.protect, authService.allowedTo('user', 'admin', 'manager'), filterOrderForLoggedUser, findAllOrders)


router.route('/:cartId')
    .post(createOrderValidator, createOrder)


router.get('/:id',findSpecificOrder)
    


router.put(
    '/:id/pay',
    authService.allowedTo('admin', 'manager'),
    updateOrderToPaid
);
router.put(
    '/:id/deliver',
    authService.allowedTo('admin', 'manager'),
    updateOrderToDelivered
);


module.exports = router; 
