'use strict';

const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig.js');

// export a function that returns a middleware
// verify JWT

module.exports = function () {
    return (req, res, next) => {
        // pick up token from request
        const token = req.body.token || req.query.token || req.get('x-access-token')

        // no token means user is 'not authorized'
        if (!token) {
            const err = new Error('no token provided');
            err.status = 401;
            next(err);
            return;
        }

        // verify token and run next middleware
        jwt.verify(token, localConfig.jwt.secret, (err, decoded) => {
            if (err) {
                next(err);
                return;
            }

            req.user_id = decoded.user_id;
            next();

        });
    };
}