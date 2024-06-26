const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'category name is required'],
        trim: true,
        unique: [true, 'category must be unique'],
        minlength: [3, 'category name must be at least 3 characters'],
        maxlength: [30, 'category name must be at most 30 characters'],
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
const setImageUrl = (doc) => {
    if (doc.image) {
        doc.image = `${process.env.BASE_URL}/categories/${doc.image}`
    }
}

categorySchema.post('init', (doc) => {
    setImageUrl(doc)
});
categorySchema.post('save', (doc) => {
    setImageUrl(doc)
});
module.exports = mongoose.model('Category', categorySchema);