const router = require('express').Router();
const {
    updateUser,
    getUsers,
    createUser,
    getSingleUser,
    DeleteUser,
    changePassword,
    uploadUserImage,
    resizeImage } = require('../controllers/userController');

const {
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
    creatUserValidator,
    passwordConfirmationValidator } = require('../utils/validations/userValidator')


const authService = require('../controllers/authController')

router.put(
    '/changePassword/:id',
    passwordConfirmationValidator, changePassword
);
router.route('/')
    .get(authService.protect,authService.allowedTo('admin', 'manager'),getUsers)
    .post(authService.protect,authService.allowedTo('admin', 'manager'),uploadUserImage, resizeImage, creatUserValidator, createUser)

router.route('/:id')
    .get(authService.protect,getUserValidator, getSingleUser)
    .put(authService.protect,uploadUserImage, resizeImage, updateUserValidator, updateUser)
    .delete(deleteUserValidator, DeleteUser)





module.exports = router; 
