
const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
const sendErrorPro = (err, res) => {
    if(err.isOperational){
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
        return res.status(500).json({
            status: 'error',
            message: 'something went wrong'
        });
    
}
const handleJwtInvalidSignature = () =>
  new AppError('Invalid token, please login again..', 401);

const handleJwtExpired = () =>
  new AppError('Expired token, please login again..', 401);

const globalErrors = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    err.message = err.message || 'internal server error';

   if(process.env.NODE_ENV !== 'production'){
         sendErrorDev(err,res);
   }else {
    if (err.name === 'JsonWebTokenError') err = handleJwtInvalidSignature();
    if (err.name === 'TokenExpiredError') err = handleJwtExpired();
    sendErrorPro(err,res);
   }
}

module.exports = globalErrors;