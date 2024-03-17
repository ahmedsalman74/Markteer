const router = require('express').Router();
const {
    updateUser,
    getUsers,
    createUser,
    getSingleUser,
    DeleteUser,
    changePassword,
    uploadUserImage,
    loggedInUser,
    changeMypassword,
    resizeImage } = require('../controllers/userController');

const {
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
    creatUserValidator,
    passwordConfirmationValidator } = require('../utils/validations/userValidator')


const authService = require('../controllers/authController')

router.get('/myData', authService.protect, loggedInUser, getSingleUser);
router.put('/changeMypassword',authService.protect,passwordConfirmationValidator, changeMypassword);




router.put('/changePassword/:id', passwordConfirmationValidator, changePassword);


router.use(authService.protect, authService.allowedTo('admin', 'manager'))
router.route('/')
    .get(getUsers)
    .post(uploadUserImage, resizeImage, creatUserValidator, createUser)

router.route('/:id')
    .get(getUserValidator, getSingleUser)
    .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
    .delete(deleteUserValidator, DeleteUser)





module.exports = router; 
