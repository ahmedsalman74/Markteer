const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        trim: true,
        minlength: [3, 'Too short product title'],
        maxlength: [100, 'Too long product title'],
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
      },
    description: { 
        type: String,
        required: [true, 'description is required'],
        trim: true,
        minlength: [10, 'Too short product description'],
        maxlength: [1000, 'Too long product description'],
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        trim: true,
        max: [1000000, 'price must be less than 1000000'],
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
    },
    sold: {
        type: Number,
        default: 0,
    },
    priceAfterDiscount: {
        type: Number,
    },
    colors: [String],

    imageCover: {
        type: String,
        required: [true, 'Product Image cover is required'],
    },
    images: {
        type: Array,
        default: [],
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'category is required'],
    },
    subCategory: [{
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
    }],
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',

    },
    ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above or equal 1.0'],
        max: [5, 'Rating must be below or equal 5.0'],
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },

   

}, { timeseries: true });


module.exports = mongoose.model('Product', productSchema);