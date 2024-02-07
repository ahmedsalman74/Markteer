
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const AppError = require('../utils/appError');

const productModel = require('../models/productModel');






//@desc get list of all products
//@route GET /api/1/products
//@access public
const getProducts = asyncHandler(async (req, res, next) => {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const product = await productModel.find({}, { "__v": false }).limit(limit).skip(skip).populate({ path: 'category', select: 'name -_id' });
    res.status(200).json({
        result: product.length,
        status: 'success',
        data: {
            product
        }
    })
})


//@desc get a single product
//@route GET /api/1/products/:id
//@access public
const getSingleProduct = asyncHandler(async (req, res, next) => {
    const productId = req.params.id;
    const product = await productModel.findById({ "_id": productId })
        .populate({ path: 'category', select: 'name -_id' });

    if (!product) {

        return next(new AppError(`Product not found`, 404))

    }
    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });

});



//@desc create new Product
//@route POST /api/1/products
//@access private
const createProduct = asyncHandler(async (req, res, next) => {

    req.body.slug = slugify(req.body.title);
    const product = await productModel.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            product
        }
    })

})

//@desc update product
//@route PUT /api/1/products/:id
//@access private
const updateProduct = asyncHandler(async (req, res, next) => {
    const productId = req.params.id;
    if (req.body.title) { req.body.slug = slugify(req.body.title); }

    const product = await productModel.findByIdAndUpdate(productId, req.body, { new: true });
    if (!product) {
        return next(new AppError(`product not found`, 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });

})

//desc delete product
//@route DELETE /api/1/products/:id
//@access private
const DeleteProduct = asyncHandler(async (req, res, next) => {
    const productId = req.params.id;
    const product = await productModel.findByIdAndDelete(productId);
    if (!product) {
        return next(new AppError(`product not found`, 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });

})







module.exports = {
    getProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    DeleteProduct
};
