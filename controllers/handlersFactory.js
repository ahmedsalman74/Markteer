const asyncHandler = require('express-async-handler')
const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
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

exports.updateOne = (Model ) =>
    asyncHandler(async (req, res, next) => {
        const {id}= req.params;
       

        const document = await Model.findByIdAndUpdate(id, req.body, { new: true });
        if (!document) {
            const modelName = Model.modelName;
            return next(new AppError(`No ${modelName} found with id ${id}`, 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                document
            }
        });

    })
    exports.createOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const document = await Model.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                document
            }
        })
    })

    exports.getOne=(Model)=>
    asyncHandler(async(req,res,next)=>{
        const {id}=req.params;
        const document=await Model.findById(id);
        if(!document){
            const modelName=Model.modelName;
            return next(new AppError(`No ${modelName} found with id ${id}`,404));
        }
        res.status(200).json({
            status:'success',
            data:{
                document
            }
        }); 
    });