const router = require('express').Router({ mergeParams: true });
const {
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdToBody,
    createFilteredObject } = require('../controllers/subCategoryController');

const { creatSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator } = require('../utils/validations/subCategoryValidator')


const authService = require('../controllers/authController')

router.route('/')
    .get(createFilteredObject, getSubCategories)
    .post(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        setCategoryIdToBody,
        creatSubCategoryValidator,
        createSubCategory)


router.route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .put(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        updateSubCategoryValidator,
        updateSubCategory)

    .delete(
        authService.protect,
        authService.allowedTo('admin'),
        deleteSubCategoryValidator,
        deleteSubCategory)


module.exports = router;