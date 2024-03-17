const router = require('express').Router();
const {
    signUp,
    login,
    forgotPassword,
    resetPassword,
    verifyPassResetCode

} = require('../controllers/authController');


const {
    signUpValidator, signinValidator } = require('../utils/validations/authValidator')


router.post('/singup', signUpValidator, signUp)


router.post('/login', signinValidator, login)

router.post('/forgotpassword', forgotPassword)
router.put('/resetPassword', resetPassword)
router.post('/verifyPassResetCode', verifyPassResetCode)






module.exports = router; 
