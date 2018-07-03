const express = require('express');
const router = express.Router();

const Ad = require('../../models/Ad');

/**
 * GET / 
 * Retrieve a list of advertisements
 */

router.get('/', async (req, res, next) => {
    try {
        // filters
        const name = req.query.name;
        const sale = req.query.sale;

        // pagination
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);

        const filter = {};

        if (name) {
            filter.name = name;
        }

        if (sale) {
            filter.sale = sale;
        }

        const ads = await Ad.list(filter, skip, limit);
        res.json({ success: true, result: ads });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
