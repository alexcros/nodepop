'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

conn.on('error', err => {
    console.log('Mongoose error')
});

conn.once('open', () => {
    console.log('Conected at MongoDB on', conn.name);
});

mongoose.connect('mongodb://localhost/nodepop');

module.exports = conn;

