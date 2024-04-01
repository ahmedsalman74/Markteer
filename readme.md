# Markteer API Documentation

Welcome to the documentation for Markteer API, a RESTful API built using Node.js and Express. This guide provides comprehensive information on how to use the API, including installation instructions, endpoints, security measures, and more.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Endpoints](#endpoints)
- [Security Measures](#security-measures)
- [Payment Gateway](#payment-gateway)
- [Contact Information](#contact-information)

## Introduction

Markteer API serves as the backend for an eCommerce application, offering various endpoints for managing categories, products, users, authentication, reviews, wishlist, orders, and more. The API is built using Node.js and Express, providing a robust and scalable solution for building eCommerce platforms.

## Installation

To run the Markteer API locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/ahmedsalman74/Markteer.git
    ```
2. Navigate to the project directory:
    ```sh
    cd Markteer
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Start the server in development mode using nodemon:
    ```sh
    npm run dev
    ```
5. The API server will start running locally at `http://localhost:8000`.

## Project Structure
project
```
├── config
│   └── connections.js
├── .eslintrc.json
├── .gitignore
├── package.json
├── package-lock.json
├── readme.md
├── server.js
└── controllers
    ├── addressControler.js
    ├── authController.js
    ├── brandController.js
    ├── cartController.js
    ├── categoryController.js
    ├── couponController.js
    ├── handlersFactory.js
    ├── orderController.js
    ├── productController.js
    ├── reviewController.js
    ├── subCategoryController.js
    ├── userController.js
    └── wishlistController.js
└── middlewares
    ├── ascyncWarpper.js
    ├── errorMiddleware.js
    ├── uploadimageMiddleware.js
    ├── validatorMiddleware.js
    └── wishlistController.js
└── models
    ├── brandModel.js
    ├── cartModel.js
    ├── categoryModel.js
    ├── couponModel.js
    ├── productModel.js
    ├── reviewModel.js
    ├── subCategoryModel.js
    ├── userModel.js
    └── orderModel.js
└── routes
    ├── addressRouts.js
    ├── authRoutes.js
    ├── brandRoutes.js
    ├── cartRoutes.js
    ├── categoryRoutes.js
    ├── couponRoutes.js
    ├── index.js
    ├── orderRoutes.js
    ├── productRoutes.js
    ├── reviewRoutes.js
    ├── subCategoryRoutes.js
    ├── userRoutes.js
    ├── subCategoryRoutes.js
    └── wishlistRoutes.js
├── uploads
└── utils
    ├── apiFeatures.js
    └── appError.js
    ├── appRateLimiter.js
    ├── createToken.js
    ├── sanitizeData.js
    ├── sendEmail.js
    ├── dummyData
    └── validations
        ├── authValidator.js
        ├── brandValidator.js
        ├── cartValidator.js
        ├── categoryValidator.js
        ├── couponValidator.js
        ├── orderValidator.js
        ├── productValidator.js
        ├── reviewValidator.js
        ├── subCategoryValidator.js
        ├── userValidator.js
        └── wishlistValidator.js
    
```
## Environment Variables

Before running the application, make sure you have set up the following environment variables:

- **PORT**: The port number on which the server will run. Default is `8000`.
- **NODE_ENV**: The environment mode. Set to `development` for local development.
- **BASE_URL**: The base URL of the application. Default is `http://localhost:8000`.
- **MONGO_URL**: The MongoDB connection URL.
- **JWT_SECRET**: The secret key for JWT authentication.
- **JWT_EXPIRES_IN**: The expiration time for JWT tokens.
- **EMAIL_HOST**: The SMTP server host for sending emails.
- **EMAIL_PORT**: The SMTP server port.
- **EMAIL_USER**: The email address used for sending emails.
- **EMAIL_PASSWORD**: The password for the email account.
- **STRIPE_SECRET**: The secret key for Stripe integration.
- **STRIPE_WEBHOOK_SECRET**: The webhook secret for Stripe integration.

Here's an example of how you can set up the environment variables:

```bash
PORT=8000
NODE_ENV=development
BASE_URL=http://localhost:8000
MONGO_URL=mongodb+srv://username:password@your-mongodb-url/your-database-name
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1000s
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-password
STRIPE_SECRET=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## Endpoints

### Categories

- **Get all categories**: `GET /api/v1/categories`
  - Returns a list of all categories.

- **Add new category**: `POST /api/v1/categories`
  - Adds a new category.

- **Get specific category**: `GET /api/v1/categories/:id`
  - Returns details of a specific category identified by its ID.

- **Update category**: `PUT /api/v1/categories/:id`
  - Updates an existing category identified by its ID.

- **Delete category**: `DELETE /api/v1/categories/:id`
  - Deletes a category identified by its ID.

### Products

- **Get all products**: `GET /api/v1/products`
  - Returns a list of all products.

- **Add new product**: `POST /api/v1/products`
  - Adds a new product.

- **Get specific product**: `GET /api/v1/products/:id`
  - Returns details of a specific product identified by its ID.

- **Update product**: `PUT /api/v1/products/:id`
  - Updates an existing product identified by its ID.

- **Delete product**: `DELETE /api/v1/products/:id`
  - Deletes a product identified by its ID.


### Sub Categories

- **Get all subcategories**: `GET /api/v1/subCategories`
  - Returns a list of all subcategories.

- **Add new subcategory**: `POST /api/v1/subCategories`
  - Adds a new subcategory.

- **Get specific subcategory**: `GET /api/v1/subCategories/:id`
  - Returns details of a specific subcategory identified by its ID.

- **Update subcategory**: `PUT /api/v1/subCategories/:id`
  - Updates an existing subcategory identified by its ID.

- **Delete subcategory**: `DELETE /api/v1/subCategories/:id`
  - Deletes a subcategory identified by its ID.

### Categories/Sub

- **Get all subcategories for specific category**: `GET /api/v1/categories/:categoryId/subcategories`
  - Returns a list of all subcategories for a specific category identified by its ID.

- **Create subcategory for specific category**: `POST /api/v1/categories/:categoryId/subcategories`
  - Creates a new subcategory for a specific category identified by its ID.

### Brands

- **Get all brands**: `GET /api/v1/brands`
  - Returns a list of all brands.

- **Add new brand**: `POST /api/v1/brands`
  - Adds a new brand.

- **Get specific brand**: `GET /api/v1/brands/:id`
  - Returns details of a specific brand identified by its ID.

- **Update brand**: `PUT /api/v1/brands/:id`
  - Updates an existing brand identified by its ID.

- **Delete brand**: `DELETE /api/v1/brands/:id`
  - Deletes a brand identified by its ID.

## Users

- **Get all users**: `GET /api/v1/users`
  - Returns a list of all users.

- **Add new user**: `POST /api/v1/users`
  - Adds a new user.

- **Get specific user**: `GET /api/v1/users/:id`
  - Returns details of a specific user identified by its ID.

- **Update user**: `PUT /api/v1/users/:id`
  - Updates an existing user identified by its ID.

- **Deactivate user**: `PUT /api/v1/users/:id`
  - Deactivates a user account identified by its ID.

- **Delete user**: `DELETE /api/v1/users/:id`
  - Deletes a user identified by its ID.

- **Change password**: `PUT /api/v1/users/:id/password`
  - Changes the password of a user identified by its ID.

## Auth

- **Signup**: `POST /api/v1/auth/signup`
  - Allows a user to sign up by providing necessary details.

- **Signin**: `POST /api/v1/auth/login`
  - Allows a user to sign in by providing credentials.

- **Forgot Password**: `POST /api/v1/auth/forgotPassword`
  - Initiates the process for resetting a forgotten password.

- **Verify Password Reset Code**: `POST /api/v1/auth/verifyPassResetCode`
  - Verifies the password reset code provided by the user.

- **Reset Password**: `PUT /api/v1/auth/resetPassword`
  - Resets the password of a user after verification.

## Logged User

- **Get logged user data**: `GET /api/v1/users/myData`
  - Returns details of the logged-in user.

- **Change password for logged-in user**: `PUT /api/v1/users/changeMypassword`
  - Changes the password of the currently logged-in user.

- **Update logged-in user**: `PUT /api/v1/users/updateLoggedInUser`
  - Updates the details of the currently logged-in user.

- **Delete logged-in user account**: `DELETE /api/v1/users/deactivateMyAccount`
  - Deletes the account of the currently logged-in user.

## Product Review

- **Create review**: `POST /api/v1/reviews`
  - Adds a new review for a product.

- **Get all reviews**: `GET /api/v1/reviews`
  - Returns a list of all reviews.

- **Get specific review**: `GET /api/v1/reviews/:id`
  - Returns details of a specific review identified by its ID.

- **Update review**: `PUT /api/v1/reviews/:id`
  - Updates an existing review identified by its ID.

- **Delete review**: `DELETE /api/v1/reviews/:id`
  - Deletes a review identified by its ID.

## Product Reviews

- **Get all reviews for specific product**: `GET /api/v1/products/:productId/reviews`
  - Returns a list of all reviews for a specific product identified by its ID.

- **Get specific review for specific product**: `GET /api/v1/products/:productId/reviews/:reviewId`
  - Returns details of a specific review for a specific product identified by their respective IDs.

- **Add review for specific product**: `POST /api/v1/products/:productId/reviews`
  - Adds a new review for a specific product identified by its ID.

## Wishlist

- **Add to wishlist**: `POST /api/v1/wishlist`
  - Adds a product to the user's wishlist.

- **Get all wishlists**: `GET /api/v1/wishlist`
  - Returns the user's wishlist.

- **Remove from wishlist**: `DELETE /api/v1/wishlist/:id`
  - Removes a product from the user's wishlist identified by its ID.

## User Address

- **Add address**: `POST /api/v1/address`
  - Adds a new address for the user.

- **Delete address**: `DELETE /api/v1/address/:id`
  - Deletes an address identified by its ID.

- **Get user addresses**: `GET /api/v1/address`
  - Returns a list of all addresses associated with the user.

## Coupon

- **Create coupon**: `POST /api/v1/coupons`
  - Creates a new coupon.

- **Get all coupons**: `GET /api/v1/coupons`
  - Returns a list of all coupons.

- **Get specific coupon**: `GET /api/v1/coupons/:id`
  - Returns details of a specific coupon identified by its ID.

- **Update coupon**: `PUT /api/v1/coupons/:id`
  - Updates an existing coupon identified by its ID.

- **Delete coupon**: `DELETE /api/v1/coupons/:id`
  - Deletes a coupon identified by its ID.
## Shopping Cart

- **Add product to cart**: `POST /api/v1/cart`
  - Adds a product to the user's shopping cart.

- **Get logged user cart**: `GET /api/v1/cart`
  - Returns the user's shopping cart.

- **Update specific cart item quantity**: `PUT /api/v1/cart/:id`
  - Updates the quantity of a specific item in the user's shopping cart identified by its ID.

- **Apply coupon**: `PUT /api/v1/cart/applyCoupon`
  - Applies a coupon to the user's shopping cart.

- **Delete specific cart item**: `DELETE /api/v1/cart/:id`
  - Deletes a specific item from the user's shopping cart identified by its ID.

## Order

- **Create cash order**: `POST /api/v1/orders/:cartId`
  - Creates a cash order using the contents of the user's shopping cart identified by its ID.

- **Get specific order**: `GET /api/v1/orders/:cartId`
  - Returns details of a specific order identified by its ID.

- **Get all orders**: `GET /api/v1/orders`
  - Returns a list of all orders.

- **Update order to paid**: `PUT /api/v1/orders/:orderId/pay`
  - Updates the status of a specific order identified by its ID to indicate that it has been paid.

- **Update order to delivered**: `PUT /api/v1/orders/:orderId/deliver`
  - Updates the status of a specific order identified by its ID to indicate that it has been delivered.

- **Get checkout session**: `GET /api/v1/orders/checkout-session/:orderId`
  - Returns the checkout session details for a specific order identified by its ID.

## Security Measures

The Markteer API prioritizes security to ensure data integrity and protect against common vulnerabilities. Below are the comprehensive security measures implemented:

### Application Security:

1. **Set Request Size Limits:**
   - The API sets limits on the size of incoming requests to prevent potential denial-of-service attacks and ensure efficient resource allocation.

2. **Prevent Brute-Forcing:**
   - Measures are in place to detect and prevent brute-force attacks on authentication endpoints, such as login and password reset.

3. **Use Anti-CSRF Tokens:**
   - Cross-Site Request Forgery (CSRF) protection is enforced by generating and validating unique tokens with each request to mitigate unauthorized actions initiated by malicious websites.

4. **Prevent HTTP Parameter Pollution:**
   - The API employs strategies to sanitize and validate incoming HTTP parameters, guarding against injection attacks and unintentional data manipulation.

5. **Perform Input Validation:**
   - Input data is thoroughly validated and sanitized to prevent various types of injection attacks, including SQL injection and NoSQL query injection.

6. **Return Only Necessary Data:**
   - Endpoints are designed to return only essential data, reducing the risk of exposing sensitive information and minimizing the potential impact of data breaches.

7. **Error & Exception Handling:**
   - Comprehensive error and exception handling mechanisms are implemented to gracefully handle unexpected failures, ensuring system stability and resilience.

### Server Security:

1. **Set Cookie Flags Appropriately:**
   - Secure and HTTPOnly flags are properly configured for cookies to enhance security by preventing client-side scripts from accessing sensitive cookie data and ensuring encrypted communication over HTTPS.

2. **Use Appropriate Security Headers:**
   - Security headers, such as Content Security Policy (CSP), Strict Transport Security (HSTS), and X-Content-Type-Options, are employed to mitigate various types of attacks, including cross-site scripting (XSS) and clickjacking.

These security measures collectively contribute to the robustness and reliability of the Markteer API, safeguarding both user data and system integrity.

## Payment Gateway

The Markteer API integrates with Stripe as the payment gateway for processing payments. This integration provides a secure and reliable payment solution for eCommerce transactions.

For instructions on using the payment gateway, please refer to the Payment Gateway section in the README.

## Contact Information

For any further assistance, inquiries, or feedback, please contact us at @ahmedsalman74. We're here to help!

Thank you for using Markteer API! 🚀
