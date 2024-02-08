const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'brand name is required'],
        trim: true,
        unique: [true, 'brand must be unique'],
        minlength: [3, 'brand name must be at least 3 characters'],
        maxlength: [30, 'brand name must be at most 30 characters'],
    },
    slug: {
        type: 'string',
        lowercase: true,
    },
    image: {
        type: String,

    },

},
    { timestamps: true }

);
module.exports = mongoose.model('brand', brandSchema);