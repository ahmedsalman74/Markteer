# Welcome to Markteer 

<!-- PROJECT LOGO -->
<br />
<p align="center">
    <img src="https://i.ibb.co/L0GjzpR/image.png" alt="Logo" width="900" height="500">
  </a>

  <h3 align="center">Markteer API Documentation</h3>
</p>

<h4 align="center">Ecommerce API built using NodeJS & Express & MongoDB</h4>

Welcome to the documentation for Markteer API, a RESTful API built using Node.js and Express. This guide provides comprehensive information on how to use the API, including installation instructions, endpoints, security measures, and more.


## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Endpoints](#endpoints)
- [Security Measures](#security-measures)
- [Payment Gateway](#payment-gateway)
- [Contact Information](#contact-information)
- [Contributing](#Contributing)

## Introduction

Markteer API serves as the backend for an eCommerce application, offering various endpoints for managing categories, products, users, authentication, reviews, wishlist, orders, and more. The API is built using Node.js and Express, providing a robust and scalable solution for building eCommerce platforms.
## Features

- User authentication and authorization.
- Categories management (create, read, update, delete).
- Subcategories management (create, read, update, delete).
- Brands management (create, read, update, delete).
- Reviews management (create, read, update, delete).
- Product management (create, read, update, delete).
- Wishlist management (add product, delete product, read).
- Coupons management (create, read, update, delete).
- User management (register, login, profile).
- Order processing (create, view, update) with cash or card.
- Cart functionality.
- Payment processing integration (Stripe).

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- sharp
- multer
- bcrypt
- Slugify
- Express-Async-Handler
- nodemailer
- Cors
- compression
- hpp
- express-rate-limit
- express-mongo-sanitize
- xss-clean
- Stripe _(for payment processing)_



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

## Endpoints
 
   - [The API ENDPOINTS Throw .](https://documenter.getpostman.com/view/27149879/2sA35HXged#intro)


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

## Contributing

Contributions are welcome! If you'd like to contribute to Markteer, please follow these guidelines:

- Fork the repository
- Create your feature branch (`git checkout -b feature/fooBar`)
- Commit your changes (`git commit -am 'Add some fooBar'`)
- Push to the branch (`git push origin feature/fooBar`)
- Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Special thanks to [Ahmed Salman](https://github.com/ahmedsalman74) for developing Markteer.
- This project was inspired by the need for an efficient marketing automation tool in today's competitive business landscape.

## Support

For support, bug reports, or feature requests, please [open an issue](https://github.com/ahmedsalman74/Markteer/issues) on GitHub.

## Contact Information

For any further assistance, inquiries, or feedback, please contact us at @ahmedsalman74. We're here to help!

Thank you for using Markteer API! 🚀
