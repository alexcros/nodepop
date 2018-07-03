const express = require('express');
const router = express.Router();

const Ad = require('../../models/Ad');

/**
 * GET / 
 * Retrieve a list of advertisements
 */

router.get('/', async (req, res, next) => {
    try {

        const name = req.query.name;
        const sale = req.query.sale;

        const filter = {};

        if (name) {
            filter.name = name;
        }

        if (sale) {
            filter.sale = sale;
        }

        const ads = await Ad.list(filter);
        res.json({ success: true, result: ads });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
