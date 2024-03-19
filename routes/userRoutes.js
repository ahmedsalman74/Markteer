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
    updateLoggedInUser,
    deactivateMyAccount,
    activateMyAccount,
    resizeImage } = require('../controllers/userController');

const {
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
    creatUserValidator,
    passwordConfirmationValidator } = require('../utils/validations/userValidator')


const authService = require('../controllers/authController')

// logged in user routes

router.put('/activateMyAccount',loggedInUser,activateMyAccount);
router.use(authService.protect)
router.get('/myData', loggedInUser, getSingleUser);
router.put('/changeMypassword', changeMypassword);
router.put('/updateLoggedInUser',uploadUserImage, resizeImage, updateUserValidator,updateLoggedInUser);
router.delete('/deactivateMyAccount',deactivateMyAccount);



// Admin routes
router.put('/changePassword/:id', passwordConfirmationValidator, changePassword);


router.use( authService.allowedTo('admin', 'manager'))
router.route('/')
    .get(getUsers)
    .post(uploadUserImage, resizeImage, creatUserValidator, createUser)

router.route('/:id')
    .get(getUserValidator, getSingleUser)
    .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
    .delete(deleteUserValidator, DeleteUser)

module.exports = router; 
