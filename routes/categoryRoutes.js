const router = require('express').Router();
const { updateCategory, getCategory, createCategory, getSingleCategory, DeleteCategory ,uploadCategoryImage,resizeImage} = require('../controllers/categoryController');
const { getCategoryValidator, updateCategoryValidator, deleteCategoryValidator, creatCategoryValidator } = require('../utils/validations/categoryValidator')

const Auth = require('../controllers/authController')
const SubCategoriesRoute = require('./subCategoryRoutes')

router.route('/')
    .get(Auth.protect, getCategory)
    .post(uploadCategoryImage,resizeImage,creatCategoryValidator, createCategory)

router.route('/:id')
    .get(getCategoryValidator, getSingleCategory)
    .put(uploadCategoryImage,resizeImage,updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, DeleteCategory)
router.use('/:id/subcategories', SubCategoriesRoute)




module.exports = router; 
