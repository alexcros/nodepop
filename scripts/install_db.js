'use strict';

// load modules and database.json
const mongoClient = require('mongoose');
var url = 'mongodb://localhost:27017/nodepop';
var json = require('../db/database.json');


mongoClient.connect(url, function(err, db) {

    if (err) {
        return console.log('Error: ', err);
    }

    // Delete ads collection
    db.collection('ads').deleteMany({}, function(err) {

        //Compruebo si hay error
        if (err) {
            return console.log('Failed to remove ads');
        }

        console.log('Successfully remove ads');

    });
    // Delete users collection
    db.collection('users').deleteMany({}, function(err) {

        if (err) {
            return console.log('Failed to remove users');
        }

        console.log('Successfully remove users');

    });

    db.collection('tags').deleteMany({}, function(err) {
    // Delete tags collection
        if (err) {
            return console.log('Failed to remove tags');
        }

        console.log('Successfully remove tags');

    });

    // load database.json to database
    db.collection('ads').insertMany(json.ads, function(err, results) {

        if (err) {
            return console.log('Failed to add ads');
        }

        console.log('The following ads have been saved: ', results.ops);

    });

    db.collection('users').insertMany(json.users, function(err, results) {

        if (err) {
            return console.log('Failed to add users');
        }

        console.log('The following users have been saved: ', results.ops);

    });

    db.collection('tags').insertMany(json.tags, function(err, results) {

        if (err) {
            return console.log('Failed to add tags');
        }

        console.log('The following tags have been saved: ', results.ops);

    });

    db.collection('users').createIndexx( { email: 1 });

});
