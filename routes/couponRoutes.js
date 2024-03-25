const router = require('express').Router();
const {
    updateCoupon,
    getCoupons,
    createCoupon,
    getSingleCoupon,
    deleteCoupon,
    } = require('../controllers/couponController');

const{createCouponValidator,updateCouponValidator,deleteCouponValidator} = require('../utils/validations/couponValidator');
const authService = require('../controllers/authController')

router.use(authService.protect,authService.allowedTo('admin', 'manager'))
router.route('/')
    .get(getCoupons)
    .post(createCouponValidator, createCoupon)

router.route('/:id')
    .get( getSingleCoupon)
    .put( updateCouponValidator,updateCoupon)
    .delete(deleteCouponValidator,deleteCoupon)





module.exports = router; 
