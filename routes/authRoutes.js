const router = require('express').Router();
const {
    signUp,
    login,
    forgotPassword

} = require('../controllers/authController');


const {
    signUpValidator, signinValidator } = require('../utils/validations/authValidator')


router.post('/singup', signUpValidator, signUp)


router.post('/login', signinValidator, login)

router.post('/forgotpassword', forgotPassword)






module.exports = router; 
