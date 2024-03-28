
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



const mountRouts = (app) => {
    app.use('/api/v1/categories', categoryRoute);
    app.use('/api/v1/products', productRoute);
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
