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

exports.updateOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;


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

exports.getOne = (Model ,popultionOpt) =>
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        let qurey = Model.findById(id);
        if(popultionOpt) {
            qurey = qurey.populate(popultionOpt);
        }
        const document = await qurey;
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
    });

    exports.getAll = (Model, modelName=" ") =>
     asyncHandler(async (req, res, next) => {
        let filter={};
        if(req.filteredObject) {
            filter = req.filteredObject;
        }
    //build query
    const documentCount = await Model.countDocuments();
    const ApiFeaturesInstance = new ApiFeatures(Model.find(filter), req.query)
        .paginate(documentCount)
        .filter()
        .search(modelName) // Search after other transformations
        .sort() // Handle sorting before search
        .limitFields()
        ;
    //execute the query
    const { mongooseQuery, paginationResults } = ApiFeaturesInstance;
    const document = await mongooseQuery.exec();

    res.status(200).json({
        result: document.length,
        paginationResults,
        status: 'success',
        data: {
            document
        }
    })
});