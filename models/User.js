'use strict';

const mongoose = require('mongoose');

 // define schema
 const userSchema = mongoose.Schema({
     email: { type: String, index:true, unique: true },
     password: String,
     name: String
 });

// create model
const User = mongoose.model('User', userSchema);

module.exports = User; 
