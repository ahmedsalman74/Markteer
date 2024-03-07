const mongoose = require('mongoose');

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
        minlength: [5, 'Password is too short'],
        maxlength: [30, 'Password must be at most 30 characters'],

    },
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
        enum: ['user', 'admin'],
        default: 'user',
    },
    active: {
        type: Boolean,
        default: true,
    },
    
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    },
   




},
    { timestamps: true }
);
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