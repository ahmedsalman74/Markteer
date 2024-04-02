const router = require('express').Router();
const {
    signUp,
    login,
    forgotPassword,
    resetPassword,
    verifyPassResetCode

} = require('../controllers/authController');
const createRateLimiter = require('../utils/appRateLimiter');

// Create rate limiters for all routes that need them
const Loginlimiter = createRateLimiter(10, 3);
const forgotPasswordlimiter = createRateLimiter(3,5);
const singuplimiter = createRateLimiter(20, 15);


const {
    signUpValidator, signinValidator } = require('../utils/validations/authValidator')


router.post('/singup',singuplimiter, signUpValidator, signUp)


router.post('/login',Loginlimiter, signinValidator, login)

router.post('/forgotpassword',forgotPasswordlimiter, forgotPassword)
router.put('/resetPassword', resetPassword)
router.post('/verifyPassResetCode', verifyPassResetCode)






module.exports = router; 
