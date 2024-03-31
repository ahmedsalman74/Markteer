
//import routs
const categoryRoute = require('./categoryRoutes');
const productRoute = require('./productRoutes');
const brandRoute = require('./brandRoutes');
const reviewRoute = require('./reviewRoutes');
const subCategoryRoute = require('./subCategoryRoutes');
const wishlistRoute = require('./wishlistRoutes');
const addressRoute = require('./addressRouts');
const couponRoute = require('./couponRoutes');
const cartRoute = require('./cartRoutes');
const orderRoute = require('./orderRoutes');

const userRoute = require('./userRoutes');
const authRoute = require('./authRoutes');


const createRateLimiter = require('../utils/appRateLimiter');

// Create rate limiters for all routes that need them
const limiter = createRateLimiter(300, "Too many requests please try again later after 15 minutes",15);



const mountRouts = (app) => {
  

    app.use('/api/v1/categories', categoryRoute);
    app.use('/api/v1/products',limiter, productRoute);
    app.use('/api/v1/brands',limiter, brandRoute);
    app.use('/api/v1/subCategories',limiter, subCategoryRoute);
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/auth', authRoute);
    app.use('/api/v1/reviews',limiter, reviewRoute);
    app.use('/api/v1/wishlist', limiter,wishlistRoute);
    app.use('/api/v1/address',limiter, addressRoute);
    app.use('/api/v1/coupons',limiter, couponRoute);
    app.use('/api/v1/cart',limiter, cartRoute);
    app.use('/api/v1/orders',limiter, orderRoute);
}

module.exports = mountRouts;
