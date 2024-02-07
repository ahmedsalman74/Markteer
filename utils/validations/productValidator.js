const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const categoryModel = require('../../models/categoryModel');
const subCategoryModel = require('../../models/subCategoryModel');

exports.createProductValidator = [
    check('title').notEmpty().withMessage('Product Title is required')
        .isLength({ min: 3 }).withMessage('too short product Title')
        .isLength({ max: 100 }).withMessage('too long product name'),
    check('price').notEmpty().withMessage('Product price is required')
        .isNumeric().withMessage('Product price must be a number')
        .isLength({ max: 30 }).withMessage('Product price is too long'),
    check('description').isString().withMessage('Product description must be string')
        .notEmpty().withMessage('Product description is required')
        .isLength({ min: 10 }).withMessage('too short product description')
        .isLength({ max: 1000 }).withMessage('too long product description'),
    check('quantity').notEmpty().withMessage('Product quantity is required')
        .isNumeric().withMessage('Product quantity  must be a number'),
    check('sold').optional().isNumeric().withMessage('Product must be a number'),
    check('priceAfterDiscount').optional().isNumeric().withMessage('priceAfterDiscount must be a number').toFloat()
        .custom((value, { req }) => {
            if (value >= req.body.price) {
                throw new Error('priceAfterDiscount must be less than price')
            }
            return true
        }),
    check('colors').optional().isArray().withMessage('colors must be an array'),
    check('imageCover').notEmpty().withMessage('Product Image cover is required'),
    check('images').optional().isArray().withMessage('images must be an array'),
    check('category').notEmpty().withMessage('Product category is required')
        .isMongoId().withMessage('Invalid category id format').custom((categoryId) =>
            categoryModel.findById(categoryId)
                .then(category => {
                    if (!category)
                        return Promise.reject(new Error(`Invalid category id ${categoryId}`));
                })),


    check('subCategory').optional().isMongoId().withMessage('Invalid subCategory id format')
        .custom(async (subCategoriesId) => {
            // Check if any subCategoriesId is invalid
            const promises = subCategoriesId.map(async (subCategoryId) => {

                const subCategory = await subCategoryModel.findById(subCategoryId);

                if (!subCategory) {
                    throw new Error(`Invalid subCategory id ${subCategoryId}`);
                }
            });
            // Wait for all promises to resolve
            await Promise.all(promises);
        })
        .custom(async (subCategoriesId, { req }) => {
            // Check if any subCategoriesId is not belong to the category, 
            const category = await categoryModel.findById(req.body.category);

            const promises = subCategoriesId.map(async (subCategoryId) => {
                const subCategory = await subCategoryModel.findById(subCategoryId);
               
                if (subCategory.category.toString() !== category.id) {
                    return new Error(`subCategory id ${subCategoryId} not belong to category id ${category.id}`);
                }
            });
            // Wait for all promises to resolve
            await Promise.all(promises);
        }),
    check('brand').optional().isMongoId().withMessage('Invalid brand id format'),
    check('ratingsAverage').optional().isNumeric().withMessage('Invalid ratings average format')
        .isLength({ min: 1, max: 5 }).withMessage('ratings average must be between 1 and 5'),

    check('ratingsQuantity').optional().isNumeric().withMessage('ratings quantity must be between 1 and 5'),
    validatorMiddleware
];
exports.getProductValidator = [
    check('id').isMongoId().withMessage('Invalid product id format'),
    validatorMiddleware
];


exports.updateProductValidator = [
    check('id').isMongoId().withMessage('Invalid ID formate'),
    // body('title')
    //   .optional()
    //   .custom((val, { req }) => {
    //     req.body.slug = slugify(val);
    //     return true;
    //   }),

    validatorMiddleware
];

exports.deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid product id format'),
    validatorMiddleware
];