const fs = require('fs');
const dotenv = require('dotenv');
const Product = require('../../models/productModel');
const dbConnection = require('../../config/connections');

dotenv.config({ path: '../../config.env' });


// Insert data into DB
const insertData = async (data) => {
    try {
        await Product.create(data);
        console.log('Data Inserted');
        process.exit();
    } catch (error) {
        console.error(error);
    }
};

// Delete data from DB
const destroyData = async () => {
    try {
        await Product.deleteMany();
        console.log('Data Destroyed');
        process.exit();
    } catch (error) {
        console.error(error);
    }
};

// Connect to DB
dbConnection()
    .then(() => {
        console.log('DB connection established');

        // Read data
        const products = JSON.parse(fs.readFileSync('./products.json'));

        // Insert or delete data based on command line arguments
        if (process.argv[2] === '-i') {
            insertData(products);
        } else if (process.argv[2] === '-d') {
            destroyData();
        }
    })
    .catch(error => {
        console.error('Error establishing DB connection:', error);
    });

