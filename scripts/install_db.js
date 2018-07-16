'use strict';


mongoClient.connect(url, function(err, db) {
// database connection
const db = require('../lib/connectMongoose');

    if (err) {
        return console.log('Error: ', err);
    }

     // Delete ads collection
    db.collection('ads').deleteMany({}, function(err) {

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

    // create email index
    //db.collection('users').createIndex( { email: 1 });

});
