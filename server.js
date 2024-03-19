const path=require('path')
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv')

dotenv.config({ path: 'config.env' })
const dbConnection = require('./config/connections');
const AppError = require('./utils/appError');
const globalErrors = require('./middlewares/errorMiddleware');
//import routs
const categoryRoute = require('./routes/categoryRoutes');
const productRoute = require('./routes/productRoutes');
const brandRoute = require('./routes/brandRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const subCategoryRoute = require('./routes/subCategoryRoutes');

const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');


// DB connection
dbConnection()

//express app

const app = express();


//middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));


const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development') {
    app.use(morgan('dev'))
    console.log(`mode ${NODE_ENV}`);
}


//router routes
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/subCategories', subCategoryRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/reviews', reviewRoute);

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
