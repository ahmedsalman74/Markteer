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
5. The API server will start running locally at `http://localhost:3000`.

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

... (and so on for all other endpoints)

## Security Measures

The Markteer API implements several security measures to ensure data integrity and protect against common vulnerabilities. These measures include:

- Application Security:
  - Set request size limits.
  - Take precautions against brute-forcing.
  - Use Anti-CSRF tokens.
  - Prevent HTTP Parameter Pollution.
  - Perform input validation to prevent NoSQL query injection.
  - Only return necessary data.
  - Error & Exception Handling: Handle uncaught exceptions and errors in asynchronous calls.
- Server Security:
  - Set cookie flags appropriately.
  - Use appropriate security headers.

For more details on security measures implemented, refer to the Security Measures section in the README.

## Payment Gateway

The Markteer API integrates with Stripe as the payment gateway for processing payments. This integration provides a secure and reliable payment solution for eCommerce transactions.

For instructions on using the payment gateway, please refer to the Payment Gateway section in the README.

## Contact Information

For any further assistance, inquiries, or feedback, please contact us at contact@markteer.com. We're here to help!

Thank you for using Markteer API! 🚀
