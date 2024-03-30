const path = require('path')
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv')
const cors = require('cors');
const compression = require('compression');

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
app.use(express.json({limit:'20kb'}));
app.use(express.static(path.join(__dirname, 'uploads')));


const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development') {
    app.use(morgan('dev'))
    console.log(`mode ${NODE_ENV}`);
}


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
