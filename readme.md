/**
 * Markteer API Documentation
 * 
 * Welcome to the documentation for Markteer API, a RESTful API built using Node.js and Express. This guide provides comprehensive information on how to use the API, including installation instructions, endpoints, security measures, and more.
 * 
 * Table of Contents
 * - Introduction
 * - Installation
 * - Endpoints
 * - Security Measures
 * - Payment Gateway
 * - Contact Information
 * 
 * Introduction
 * Markteer API serves as the backend for an eCommerce application, offering various endpoints for managing categories, products, users, authentication, reviews, wishlist, orders, and more. The API is built using Node.js and Express, providing a robust and scalable solution for building eCommerce platforms.
 * 
 * Installation
 * To run the Markteer API locally, follow these steps:
 * - Clone the repository.
 * - Navigate to the project directory in your terminal.
 * - Run npm install to install dependencies.
 * - Run npm run dev to start the server in development mode using nodemon.
 * 
 * Endpoints
 * Categories
 * - Get all categories: GET /api/v1/categories
 * - Add new category: POST /api/v1/categories
 * - Get specific category: GET /api/v1/categories/:id
 * - Update category: PUT /api/v1/categories/:id
 * - Delete category: DELETE /api/v1/categories/:id
 * 
 * Products
 * - Get all products: GET /api/v1/products
 * - Add new product: POST /api/v1/products
 * - Get specific product: GET /api/v1/products/:id
 * - Update product: PUT /api/v1/products/:id
 * - Delete product: DELETE /api/v1/products/:id
 * 
 * Sub Categories
 * - Get all subcategories: GET /api/v1/subCategories
 * - Add new subcategory: POST /api/v1/subCategories
 * - Get specific subcategory: GET /api/v1/subCategories/:id
 * - Update subcategory: PUT /api/v1/subCategories/:id
 * - Delete subcategory: DELETE /api/v1/subCategories/:id
 * 
 * Categories/Sub
 * - Get all subcategories for specific category: GET /api/v1/categories/:categoryId/subcategories
 * - Create subcategory for specific category: POST /api/v1/categories/:categoryId/subcategories
 * 
 * Brands
 * - Get all brands: GET /api/v1/brands
 * - Add new brand: POST /api/v1/brands
 * - Get specific brand: GET /api/v1/brands/:id
 * - Update brand: PUT /api/v1/brands/:id
 * - Delete brand: DELETE /api/v1/brands/:id
 * 
 * Users
 * - Get all users: GET /api/v1/users
 * - Add new user: POST /api/v1/users
 * - Get specific user: GET /api/v1/users/:id
 * - Update user: PUT /api/v1/users/:id
 * - Deactivate user: PUT /api/v1/users/:id
 * - Delete user: DELETE /api/v1/users/:id
 * - Change password: PUT /api/v1/users/:id/password
 * 
 * Auth
 * - Signup: POST /api/v1/auth/signup
 * - Signin: POST /api/v1/auth/login
 * - Forgot Password: POST /api/v1/auth/forgotPassword
 * - Verify Password Reset Code: POST /api/v1/auth/verifyPassResetCode
 * - Reset Password: PUT /api/v1/auth/resetPassword
 * 
 * Logged User
 * - Get logged user data: GET /api/v1/users/myData
 * - Change password for logged in user: PUT /api/v1/users/changeMypassword
 * - Update logged in user: PUT /api/v1/users/updateLoggedInUser
 * - Delete logged in user account: DELETE /api/v1/users/deactivateMyAccount
 * 
 * Product Review
 * - Create review: POST /api/v1/reviews
 * - Get all reviews: GET /api/v1/reviews
 * - Get specific review: GET /api/v1/reviews/:id
 * - Update review: PUT /api/v1/reviews/:id
 * - Delete review: DELETE /api/v1/reviews/:id
 * 
 * Product Reviews
 * - Get all reviews for specific product: GET /api/v1/products/:productId/reviews
 * - Get specific review for specific product: GET /api/v1/products/:productId/reviews/:reviewId
 * - Add review for specific product: POST /api/v1/products/:productId/reviews
 * 
 * Wishlist
 * - Add to wishlist: POST /api/v1/wishlist
 * - Get all wishlists: GET /api/v1/wishlist
 * - Remove from wishlist: DELETE /api/v1/wishlist/:id
 * 
 * User Address
 * - Add address: POST /api/v1/address
 * - Delete address: DELETE /api/v1/address/:id
 * - Get user addresses: GET /api/v1/address
 * 
 * Coupon
 * - Create coupon: POST /api/v1/coupons
 * - Get all coupons: GET /api/v1/coupons
 * - Get specific coupon: GET /api/v1/coupons/:id
 * - Update coupon: PUT /api/v1/coupons/:id
 * - Delete coupon: DELETE /api/v1/coupons/:id
 * 
 * Shopping Cart
 * - Add product to cart: POST /api/v1/cart
 * - Get logged user cart: GET /api/v1/cart
 * - Update specific cart item quantity: PUT /api/v1/cart/:id
 * - Apply coupon: PUT /api/v1/cart/applyCoupon
 * - Delete specific cart item: DELETE /api/v1/cart/:id
 * 
 * Order
 * - Create cash order: POST /api/v1/orders/:cartId
 * - Get specific order: GET /api/v1/orders/:cartId
 * - Get all orders: GET /api/v1/orders
 * - Update order to paid: PUT /api/v1/orders/:orderId/pay
 * - Update order to delivered: PUT /api/v1/orders/:orderId/deliver
 * - Get checkout session: GET /api/v1/orders/checkout-session/:orderId
 * 
 * Security Measures
 * The Markteer API implements several security measures to ensure data integrity and protect against common vulnerabilities. These measures include:
 * - Application Security:
 *   - Set request size limits.
 *   - Take precautions against brute-forcing.
 *   - Use Anti-CSRF tokens.
 *   - Prevent HTTP Parameter Pollution.
 *   - Perform input validation to prevent NoSQL query injection.
 *   - Only return necessary data.
 * - Error & Exception Handling: Handle uncaught exceptions and errors in asynchronous calls.
 * - Server Security:
 *   - Set cookie flags appropriately.
 *   - Use appropriate security headers.
 * 
 * For more details on security measures implemented, refer to the Security Measures section in the README.
 * 
 * Payment Gateway
 * The Markteer API integrates with Stripe as the payment gateway for processing payments. This integration provides a secure and reliable payment solution for eCommerce transactions.
 * 
 * For instructions on using the payment gateway, please refer to the Payment Gateway section in the README.
 * 
 * Contact Information
 * For any further assistance, inquiries, or feedback, please contact us at contact@markteer.com. We're here to help!
 * 
 * Thank you for using Markteer API! 🚀
 */
