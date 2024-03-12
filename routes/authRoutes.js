const router = require('express').Router();
const {
    signUp
} = require('../controllers/authController');

const {
    signUpValidator} = require('../utils/validations/authValidator')


router.route('/singup')
    
    .post(signUpValidator, signUp)




module.exports = router; 
