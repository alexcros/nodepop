'use strict';

const mongoose = require('mongoose');
const readLine = require('readline');
const async = require('async');
var path = require('path');

// database connection
const db = require('../lib/connectMongoose');

// load defined models
require('../models/User');
require('../models/Ad');

db.once('open', function () {

    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //TODO: on first install there isn't a dabatase, improve this
    rl.question('Are you sure you want to empty DB? (yes/NO)', function (answer) {
        rl.close();
        if (answer.toLowerCase() === 'yes') {
            runInstallScript();
        } else {
            console.log('DB Install aborted!');
            return process.exit(0);
        }
    });

});

function runInstallScript() {
    async.series([
        initAds,
        initUsers,
        endScript
    ], (err) => {
        if (err) {
            console.error('Error: ', err);
            return process.exit(0);
        }
    });
}

function initAds(callback) {
    const Ad = mongoose.model('Ad');

    Ad.remove({}, () => {
        console.log('Ads deleted');

        // Load ads.json
        const file = path.join(__filename, '../db/ads.json');
        console.log('Loading ' + file + '...');

        Ad.loadJson(file).then(numLoaded => {
            console.log(`Loaded ${numLoaded} ads.`);
            return callback(null, numLoaded);
        }).catch(err => callback(err));

    });
}

function initUsers(callback) {
    const User = mongoose.model('User');

    User.remove({}, () => {
        console.log('Users deleted');

        //load Users
        const users = [
            {
                email: "admin@example.com",
                name: "",
                password: "1234"
            }
        ];

        async.eachSeries(users, User.createRecord, (err) => {
            if (err) return callback(err);

            console.log(`Loaded ${users.length} users`);
            return callback(null, users.length);
        });

    });
}

function endScript() {
    console.log('script load completed!')
    return process.exit(0);
}

