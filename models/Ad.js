'use strict';

const mongoose = require('mongoose');

//define schema : all the  typs here mongoosejs.com/docs/schematypes.html DIA 5 parte 1 ; 1:46:00
const adSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    photo: String
});

// model static method
adSchema.statics.list = function(filter) {

    //TODO: case insensitive
    // create query with desired filter
    const query = Ad.find(filter);

    // execute query and return promise
    return query.exec();
}

// create model
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad; // mongoose no lo necesita
