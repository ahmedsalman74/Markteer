const router = require('express').Router();
const {
    updateCoupon,
    getCoupons,
    createCoupon,
    getSingleCoupon,
    DeleteCoupon,
    } = require('../controllers/couponController');

const authService = require('../controllers/authController')

router.use(authService.protect,authService.allowedTo('admin', 'manager'))
router.route('/')
    .get(getCoupons)
    .post( createCoupon)

router.route('/:id')
    .get( getSingleCoupon)
    .put( updateCoupon)
    .delete(DeleteCoupon)





module.exports = router; 
