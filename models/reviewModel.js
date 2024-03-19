const mongoose = require('mongoose');

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


},{timestamps:true});

module.exports = mongoose.model('review', reviewSchema);