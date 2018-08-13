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
        const tag = req.query.tag;
        const sale = req.query.sale;
        const fields = req.query.fields;

        // pagination
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 10;

        // sort
        const sort = req.query.sort;

        const filter = {};

        if (req.query.price) {
            const priceRange = req.query.price.split('-');
            
            if (req.query.price.indexOf('-') == -1) {
                filter.price = req.query.price;
            } else {
                // price has range
                if ((priceRange[0] && priceRange[1])) {
                    filter.price = { '$gte': priceRange[0].toString(), '$lte': priceRange[1].toString() };
                }
                else if (priceRange[0]) {
                    filter.price = { '$gte': priceRange[0].toString() };
                }
                else if (priceRange[1]) {
                    filter.price = { '$lte': priceRange[1].toString() };
                }
            }
        }

        if (tag) {
            filter.tags = tag;
        }

        if (sale) {
            filter.sale = sale;
        }

        if (name) {
            // filter by starting letter
            filter.name = new RegExp('^' + req.query.name, 'i');
        }

        const ads = await Ad.list(filter, skip, limit, fields, sort);
        res.json({ success: true, result: ads });
    }
    catch (err) {
        next(err);
    }
});

router.get('/tags', function (req, res) {
    res.json({ success: true, allowedTags: Ad.allowedTags() });
});

module.exports = router;
