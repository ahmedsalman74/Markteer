const router = require('express').Router();
const { updateCategory, getCategory, createCategory, getSingleCategory, DeleteCategory } = require('../controllers/categoryController');
const { getCategoryValidator, updateCategoryValidator, deleteCategoryValidator, creatCategoryValidator } = require('../utils/validations/categoryValidator')


const SubCategoriesRoute = require('./subCategoryRoutes')

router.route('/')
    .get(getCategory)
    .post(creatCategoryValidator, createCategory)

router.route('/:id')
    .get(getCategoryValidator, getSingleCategory)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, DeleteCategory)
router.use('/:id/subcategories', SubCategoriesRoute)




module.exports = router; 
