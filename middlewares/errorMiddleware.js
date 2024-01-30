const globalErrors = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    err.message = err.message || 'internal server error';

   if(process.env.NODE_ENV !== 'production'){
         sendErrorDev(err,res);
   }else {
    sendErrorPro(err,res);
   }
}


const sendErrorDev = (err, res) => {
   return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}
const sendErrorPro = (err, res) => {
    if(err.isOperational){
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }else {
        return res.status(500).json({
            status: 'error',
            message: 'something went wrong'
        });
    }
}

module.exports = globalErrors;