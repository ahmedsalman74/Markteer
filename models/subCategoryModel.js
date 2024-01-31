const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'Subcategory must be unique'],
        minlingth: [2, 'to short to sub category name'],
        maxlingth: [30, 'to long to sub category name'],
        trim: true
    },
    slug: {
        type: String,
        lowercase: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'SubCategory must belong to a category object']
    },





}, { timestamps: true });



module.exports = mongoose.model('SubCategory', subCategorySchema);