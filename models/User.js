/*
'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

// create model
const User = mongoose.model('User', userSchema);

module.exports = User;
*/