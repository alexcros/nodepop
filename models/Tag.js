'use strict';

const mongoose = require('mongoose');

// define schema
const adSchema = mongoose.Schema({
    tags: [String]
});

// create model
const Tag = mongoose.model('Tag', adSchema);

module.exports = Tag;
