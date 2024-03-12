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

router.put(
    '/changePassword/:id',
    passwordConfirmationValidator, changePassword
);
router.route('/')
    .get(getUsers)
    .post(uploadUserImage, resizeImage, creatUserValidator, createUser)

router.route('/:id')
    .get(getUserValidator,getSingleUser)
    .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
    .delete(deleteUserValidator, DeleteUser)





module.exports = router; 
