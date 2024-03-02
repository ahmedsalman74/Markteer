const multer = require('multer');
const AppError = require('../utils/appError');

exports.uploadSingleImage = (fieldName) => {

    const multerStorage = multer.memoryStorage();
    const multerFilter = function (req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new AppError('Not an image! Please upload only images', 400), false);
        }
    }

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
    return upload.single(fieldName);
}