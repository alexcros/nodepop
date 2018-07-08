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
        const price = req.query.price;

        // pagination
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);

        // sort
        const sort = req.query.sort;

        const filter = {};

        switch(price) {
            case '10-50':
            filter.price = { '$gte': '10','$lte': '50'};
            break; 
            case '-50':
            filter.price = {'$lt': '50'};
            break;
            case '10-': 
            filter.price = { '$gt': '10'};
            break;
            case '50': 
            filter.price = '50';
            break;
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

module.exports = router;
