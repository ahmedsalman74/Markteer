const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Coupon code is required'],
        trim: true,
        unique: true,
        uppercase: true,
    },
    discount: {
        type: Number,
        required: [true, 'Coupon discount is required'],
        min: [1, 'Discount must be at least 1'],
        max: [99, 'Discount must be at most 99'],
    },
    expiry: {
        type: Date,
        required: [true, 'Coupon expiry date is required'],
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

module.exports =mongoose.model('Coupon', couponSchema);