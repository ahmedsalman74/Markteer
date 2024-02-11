
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const AppError = require('../utils/appError');

const productModel = require('../models/productModel');






//@desc get list of all products
//@route GET /api/1/products
//@access public
const getProducts = asyncHandler(async (req, res, next) => {
    // filter products

    const queryStringObj = { ...req.query }
    const removeFields = ['limit', 'page', 'sort', 'fields']
    removeFields.forEach(el => delete queryStringObj[el]);

    // advanced filter
    let queryString = JSON.stringify(queryStringObj);
    // using regular expression to add $ sign to the query
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);


    // pagination
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;


    let mongooseQuery = productModel.find(JSON.parse(queryString), { "__v": false })
        .limit(limit)
        .skip(skip)
        .populate({ path: 'category', select: 'name -_id' });

    // sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        mongooseQuery = mongooseQuery.sort(sortBy);
    } else {
        mongooseQuery = mongooseQuery.sort('-createdAt');
    }

    // field limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        mongooseQuery = mongooseQuery.select(fields);
    }

    // search criteria
    if (req.query.search) {
        const queery={}
        queery.$or = [
            { title: { $regex: req.query.search, $options: 'i' } },
            { description: { $regex: req.query.search, $options: 'i' } }
        ];
        mongooseQuery = productModel.find(queery)
    }

    const product = await mongooseQuery;




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
