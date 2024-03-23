const mongoose = require('mongoose');
const Product = require('./productModel');

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Review title is required'],
    trim: true,
    minlength: [3, 'Review title must be at least 3 characters'],
    maxlength: [30, 'Review title must be at most 30 characters'],
  },

  description: {
    type: String,
    required: [true, 'Review description is required'],
    trim: true,
    minlength: [3, 'Review description must be at least 3 characters'],
    maxlength: [300, 'Review description must be at most 300 characters'],
  },

  rating: {
    type: Number,
    required: [true, 'Review rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be at most 5'],
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, 'Review must belong to a user'],
  },

  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'product',
    required: [true, 'Review must belong to a product'],
  },


}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (
  productId
) {
 const result = await this.aggregate([
  // Stage 1: Get all reviews for the specific product
  {
    $match: { product: productId },
  },
  // Stage 2: Group reviews by productId and calculate average ratings and ratings quantity
  {
    $group: {
      _id: '$product', // Group by the product field
      avgRatings: { $avg: '$rating' }, // Calculate average ratings
      ratingsQuantity: { $sum: 1 }, // Count the number of reviews
    },
  },
]);


  console.log(result);
  if (result.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: result[0].avgRatings,
      ratingsQuantity: result[0].ratingsQuantity,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post('save', async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

reviewSchema.post('remove', async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

module.exports = mongoose.model('review', reviewSchema);