const asyncHandler = require('express-async-handler')
const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');

exports.deleteOne =(Model)=>
asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
        return next(new AppError(`product not found`, 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            document
        }
    });

});



