const path = require('path')
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv')
const cors = require('cors');
const compression = require('compression');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const { xss } = require('express-xss-sanitizer');
const swaggerUi = require('swagger-ui-express');
const swaggerjsdoc = require('swagger-jsdoc');


dotenv.config({ path: 'config.env' })
const dbConnection = require('./config/connections');
const AppError = require('./utils/appError');
const globalErrors = require('./middlewares/errorMiddleware');
// import routes
const mountRouts = require('./routes');
const { webhookCheckout } = require('./controllers/orderController');


// DB connection
dbConnection()

//express app

const app = express();

//enable cors middleware for all domains
app.use(cors());
app.options('*', cors());

app.use(compression());

// Checkout webhook

app.post(
    '/webhook-checkout',
    express.raw({ type: 'application/json' }),
    webhookCheckout
);


//middlewares
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'uploads')));


const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development') {
    app.use(morgan('dev'))
    console.log(`mode ${NODE_ENV}`);
}

//swagger documentation is available at /api-docs
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce API',
            version: '1.0.0',
            description: 'A simple API for an e-commerce application',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
        ],
    },
    apis: ['./swagger.js'], // Include all route files in the routes directory
};




const specs = swaggerjsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//middleware to protect against HTTP Parameter Pollution attacks

app.use(hpp({
    whitelist: [
        'price',
        'sold',
        'quantity',
        'ratingsAverage',
        'ratingsQuantity',
    ],
}));

// middleware to protect against HTTP Parameter Pollution attacks with mongoDB 
app.use(mongoSanitize());

// middleware to protect against cross site scripting attacks
app.use(xss())
//router routes
mountRouts(app);


//error routes handler
app.all('*', (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
})

//global error handler middleware
app.use(globalErrors);





const Port = process.env.PORT || 8000;
const server = app.listen(Port, (req, res) => {
    console.log(`listening to port ${Port} 🚀🚀`);
});

//handle unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.error(`unhandledRejection ${err}`)
    server.close(() => {
        console.error(`shutting down ...... `)
        process.exit(1)
    })

})
