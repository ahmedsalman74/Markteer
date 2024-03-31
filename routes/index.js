const { rateLimit } = require('express-rate-limit')
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

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message:"Rate limit exceeded, please try again later after 15 minutes",
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})




const mountRouts = (app) => {
  

    app.use('/api/v1/categories', categoryRoute);
    app.use('/api/v1/products',limiter, productRoute);
    app.use('/api/v1/brands', brandRoute);
    app.use('/api/v1/subCategories', subCategoryRoute);
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/auth', authRoute);
    app.use('/api/v1/reviews', reviewRoute);
    app.use('/api/v1/wishlist', wishlistRoute);
    app.use('/api/v1/address', addressRoute);
    app.use('/api/v1/coupons', couponRoute);
    app.use('/api/v1/cart', cartRoute);
    app.use('/api/v1/orders', orderRoute);
}

module.exports = mountRouts;
