const express = require('express');

const authService = require('../controllers/authController');

const {
    addToAddress,
    removeAddress,
    getLoggedUserAddresses,
} = require('../controllers/addressController');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('user'));

router.route('/').post(addToAddress).get(getLoggedUserAddresses);

router.delete('/:addressId', removeAddress);

module.exports = router;