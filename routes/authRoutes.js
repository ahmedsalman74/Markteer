const router = require('express').Router();
const {
    signUp,
    login,
} = require('../controllers/authController');


const {
    signUpValidator,signinValidator} = require('../utils/validations/authValidator')


router.route('/singup')
    
    .post(signUpValidator, signUp)


router.route('/login')
    
    .post(signinValidator, login)




module.exports = router; 
