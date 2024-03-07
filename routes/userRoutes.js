const router = require('express').Router();
const {
    updateUser,
    getUsers,
    createUser,
    getSingleUser,
    DeleteUser,
    uploadUserImage,
    resizeImage } = require('../controllers/userController');

// const {
//     getBrandValidator,
//     updateBrandValidator,
//     deleteBrandValidator,
//     creatBrandValidator } = require('../utils/validations/brandValidator')


router.route('/')
    .get(getUsers)
    .post(uploadUserImage, resizeImage, createUser)

router.route('/:id')
    .get(getSingleUser)
    .put(uploadUserImage, resizeImage, updateUser)
    .delete(DeleteUser)





module.exports = router; 
