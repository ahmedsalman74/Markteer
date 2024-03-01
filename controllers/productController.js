// Description: It Contain all the product related methods.
const factory = require('./handlersFactory');
const productModel = require('../models/productModel');


//@desc get list of all products
//@route GET /api/1/products
//@access public
const getProducts = factory.getAll(productModel,"products");


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
