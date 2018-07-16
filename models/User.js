'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const v = require('validator');

// define schema
const userSchema = mongoose.Schema({
    email: { type: String, index: true, unique: true },
    password: String,
    name: { type: String, index: true }
});

// create model
const User = mongoose.model('User', userSchema);

module.exports = User; 
