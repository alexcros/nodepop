'use strict';

const localConfig = require('../localConfig');
const mongoose = require('mongoose');
const conn = mongoose.connection;

conn.on('error', err => {
    console.log('Mongoose error',err);
});

conn.once('open', () => {
    console.log('Conected at MongoDB on', conn.name);
});

mongoose.connect(localConfig.mongodb.localhost);

module.exports = conn;
