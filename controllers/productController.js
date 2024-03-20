// Description: It Contain all the product related methods.
const fs = require('fs');
const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const factory = require('./handlersFactory');
const productModel = require('../models/productModel');
const { uploadMultipleImages } = require('../middlewares/uploadimageMiddleware')

const uploadDirectory = 'uploads/products';

// Ensure the upload directory exists, if not, create it
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const uploadMultiImages = uploadMultipleImages([
    {
      name: 'imageCover',
      maxCount: 1,
    },
    {
      name: 'images',
      maxCount: 5,
    },
  ]);

const resizeMultiImages = asyncHandler(async (req, res, next) => {
    // console.log(req.files);
    //1- Image processing for imageCover
    if (req.files.imageCover) {
      const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
  
      await sharp(req.files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toFile(`uploads/products/${imageCoverFileName}`);
  
      // Save image into our db
      req.body.imageCover = imageCoverFileName;
    }
    //2- Image processing for images
    if (req.files.images) {
      req.body.images = [];
      await Promise.all(
        req.files.images.map(async (img, index) => {
          const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
  
          await sharp(img.buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/products/${imageName}`);
  
          // Save image into our db
          req.body.images.push(imageName);
        })
      );
  
      next();
    }
  });

//@desc get list of all products
//@route GET /api/1/products
//@access public
const getProducts = factory.getAll(productModel, "products");


//@desc get a single product
//@route GET /api/1/products/:id
//@access public
const getSingleProduct = factory.getOne(productModel,"reviews");

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

const DeleteProduct = factory.deleteOne(productModel);


module.exports = {
    getProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    DeleteProduct,
    uploadMultiImages, resizeMultiImages
};
