const express = require('express');
const router = express.Router();

const Tag = require('../../models/Tag');

//const jwtAuth = require('../../lib/jwtAuth');

/**
 * GET / 
 * Retrieve a list of tags
 */

router.get('/', async (req, res, next) => {
    try {
        console.log('get tags:', req.body);

        const tags = await Tag.find();
        res.json({ success: true, result: tags });
    }
 catch (err) {
        next(err);
    }
});

module.exports = router;
