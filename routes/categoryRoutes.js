const router = require('express').Router();
const { updateCategory, getCategory, createCategory, getSingleCategory, DeleteCategory, uploadCategoryImage, resizeImage } = require('../controllers/categoryController');
const { getCategoryValidator, updateCategoryValidator, deleteCategoryValidator, creatCategoryValidator } = require('../utils/validations/categoryValidator')

const authService = require('../controllers/authController')
const SubCategoriesRoute = require('./subCategoryRoutes')

router.route('/')
    .get( authService.protect, getCategory)
    .post(authService.protect,authService.allowedTo('admin', 'manager'), uploadCategoryImage, resizeImage, creatCategoryValidator, createCategory)

router.route('/:id')
    .get(getCategoryValidator, getSingleCategory)
    .put(authService.protect,authService.allowedTo('admin', 'manager'),uploadCategoryImage, resizeImage, updateCategoryValidator, updateCategory)
    .delete(authService.protect,authService.allowedTo('admin'),deleteCategoryValidator, DeleteCategory)
    
router.use('/:id/subcategories',authService.protect,authService.allowedTo('admin', 'manager'), SubCategoriesRoute)




module.exports = router; 
