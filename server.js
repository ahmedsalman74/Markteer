const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' })
const dbConnection = require('./config/connections');
const categoryRoute = require('./routes/categoryRoutes');
const AppError = require('./utils/appError');
const globalErrors = require('./middlewares/errorMiddleware');


// DB connection
dbConnection()

//express app

const app = express();

//middlewares
app.use(express.json());
const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development') {
    app.use(morgan('dev'))
    console.log(`mode ${NODE_ENV}`);
}


//router routes
app.use('/api/v1/categories', categoryRoute);

//error routes handler
app.all('*', (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
})

//global error handler middleware
app.use(globalErrors);












const Port = process.env.PORT || 8000;
const server =app.listen(Port, (req, res) => {
    console.log(`listening to port ${Port} 🚀🚀`);
});

//handle unhandled promise rejection
process.on('unhandledRejection',(err) => {
    console.error(`unhandledRejection ${err}`)
    server.close(() => {
        console.error(`shutting down ...... `)
        process.exit(1)
    })
    
})
