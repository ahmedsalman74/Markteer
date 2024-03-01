/* eslint-disable no-else-return */
const brandModel = require('../models/brandModel');
const factory = require('./handlersFactory');

//@desc get a list of brands
//@route GET /api/1/brands
//@access public
const getBrands =factory.getAll(brandModel)


//@desc get a single Brand
//@route GET /api/1/brands/:id
//@access public
const getSingleBrand = factory.getOne(brandModel);

//@desc create new brand
//@route POST /api/1/brands
//@access private
const createBrand = factory.createOne(brandModel);

//@desc update brand
//@route PUT /api/1/brands/:id
//@access private
const updateBrand = factory.updateOne(brandModel)

//desc delete brand
//@route DELETE /api/1/categories/:id
//@access private

const DeleteBrand = factory.deleteOne(brandModel);






module.exports = {
    getBrands,
    createBrand,
    getSingleBrand,
    updateBrand,
    DeleteBrand
};