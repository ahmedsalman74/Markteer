const rateLimit = require('express-rate-limit');
const AppError = require('./appError');


function createRateLimiter(max, windowMinutes) {
    return rateLimit({
        windowMs: windowMinutes * 60 * 1000, // Convert minutes to milliseconds
        max: max,
        handler: function (req, res, next) {
            throw new AppError(`Too many requests please try again later after ${windowMinutes} minutes`, 404);
        },
        standardHeaders: true,
        legacyHeaders: false
    });
}


module.exports = createRateLimiter;