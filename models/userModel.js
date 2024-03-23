const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'user name is required'],
        trim: true,

        minlength: [3, 'user name must be at least 3 characters'],
        maxlength: [30, 'user name must be at most 30 characters'],
    },
    slug: {
        type: 'string',
        lowercase: true,
    },
    image: {
        type: String,

    },
    password: {
        type: String,
        required: [true, 'Password  is required'],
        minlength: [8, 'Password is too short'],


    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordResetVerfied: Boolean,
    email: {
        type: 'string',
        required: [true, 'Password  is required'],
        unique: true,
        lowercase: true,

    },
    phone: {
        type: 'string',
        required: [true, 'Phone  is required'],
        unique: true,
        lowercase: true,

    },
    role: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        default: 'user',
    },
    // child reference (one to many)
    wishlist: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
        },
    ],
    active: {
        type: Boolean,
        default: true,
    },






},
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // Hashing user password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const setImageUrl = (doc) => {
    if (doc.image) {
        doc.image = `${process.env.BASE_URL}/users/${doc.image}`
    }
}

userSchema.post('init', (doc) => {
    setImageUrl(doc)
});
userSchema.post('save', (doc) => {
    setImageUrl(doc)
});
module.exports = mongoose.model('user', userSchema);