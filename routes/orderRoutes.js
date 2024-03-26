const router = require('express').Router();
const {
    createOrder
     } = require('../controllers/orderController');
const authService = require('../controllers/authController')

// logged in user routes

router.use(authService.protect, authService.allowedTo('user'));


router.route('/')
    .get()
    .post(createOrder)

router.route('/:id')
    .delete()
    

module.exports = router; 
