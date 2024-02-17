
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const AppError = require('../utils/appError');
const factory = require('./handlersFactory');
const productModel = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');





//@desc get list of all products
//@route GET /api/1/products
//@access public
const getProducts = asyncHandler(async (req, res, next) => {
    //build query
    const documentCount=await productModel.countDocuments();
    const ApiFeaturesInstance = new ApiFeatures(productModel.find(), req.query)
        .paginate(documentCount)
        .filter()
        .search("Products") // Search after other transformations
        .sort() // Handle sorting before search
        .limitFields()
        ;
    //execute the query
    const{mongooseQuery,paginationResults} = ApiFeaturesInstance;
    const product = await mongooseQuery.exec();

    res.status(200).json({
        paginationResults,
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
const getSingleProduct = factory.getOne(productModel);



//@desc create new Product
//@route POST /api/1/products
//@access private
const createProduct = factory.createOne(productModel);

//@desc update product
//@route PUT /api/1/products/:id
//@access private
const updateProduct = factory.updateOne(productModel)

//desc delete product
//@route DELETE /api/1/products/:id
//@access private

const DeleteProduct= factory.deleteOne(productModel);


module.exports = {
    getProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    DeleteProduct
};
