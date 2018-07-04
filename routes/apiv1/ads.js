const express = require('express');
const router = express.Router();

const Ad = require('../../models/Ad');

const jwtAuth = require('../../lib/jwtAuth');

/**
 * GET / 
 * Retrieve a list of advertisements
 */

router.get('/', jwtAuth(), async (req, res, next) => {
    try {
        // log user
        console.log('Authenticated user is:', req.user_id);

        // filters
        const name = req.query.name;
        const sale = req.query.sale;
        const fields = req.query.fields;

        // pagination
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);

        // sort
        const sort = req.query.sort;

        const filter = {};

        if (name) {
            filter.name = name;
        }

        if (sale) {
            filter.sale = sale;
        }

        const ads = await Ad.list(filter, skip, limit, fields, sort);
        res.json({ success: true, result: ads });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
