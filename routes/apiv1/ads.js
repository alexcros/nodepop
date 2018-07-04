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
