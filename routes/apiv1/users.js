'use strict';

const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

const localConfig = require('../../localConfig.js');

router.post('/login', async (req, res, next) => {
    try {
        // collect credentials
        const email = req.body.email;
        const password = req.body.password;

        // search users on db
        const user = await User.findOne({ email: email }).exec();

        // check user
        if (!user) {
            res.json({ success: true, message: 'invalid user' });
            return;
        }

        // verify password
        if (password !== user.password) {
            res.json({ success: true, message: 'invalid password' });
            return;
        }

        // create JWT
        jwt.sign({ user_id: user._id }, localConfig.jwt.secret, {
            expiresIn: localConfig.jwt.expiresIn
        }, (err, token) => {
            if (err) {
                next(err);
                return;
            }
            // answer client with JWT
            res.json({ success: true, token })
        });
    } catch (error) {
        next(err);
    }
});

module.exports = router;