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
const setImageUrl = (doc) => {
    if (doc.image) {
        doc.image = `${process.env.BASE_URL}/brands/${doc.image}`
    }
}

brandSchema.post('init', (doc) => {
    setImageUrl(doc)
});
brandSchema.post('save', (doc) => {
    setImageUrl(doc)
});
module.exports = mongoose.model('brand', brandSchema);