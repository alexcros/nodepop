'use strict';

const mongoose = require('mongoose');

// define schema
const adSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    photo: String,
    tags: { type: [ { type: String, enum: ['work', 'lifestyle', 'motor', 'mobile'] } ] }
});

/**
 * model static methods
 */

// filter list
adSchema.statics.list = function (filter, skip, limit, fields, sort, tags) {

    // create query with desired filters
    const query = Ad.find(filter);
    query.select(fields);

    // add pagination
    query.skip(skip);
    query.limit(limit);

    // db sort is executed before the pagination
    query.sort(sort);

    // execute query and return promise
    return query.exec(tags);
}

// filter by tag
adSchema.statics.tagList = (tags) => {
    const query = Ad.distinct('tags');
    query.exec(tags);
};

/**
 * List of permitted tags
 */
adSchema.statics.allowedTags = function () {
    return ['work', 'lifestyle', 'motor', 'mobile'];
};

// create model
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
