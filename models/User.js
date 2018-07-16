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

userSchema.statics.createRecord = function (addUser, callback) {
    // validations
    const valErrors = [];
    //TODO: check name length
    // if (!(v.isAlpha(addUser.name) && v.isLength(addUser.name, 2))) {
    //     valErrors.push({ field: 'name', message: __('validation_invalid', { field: 'name' }) });
    // }
    if (!v.isEmail(addUser.email)) {
        valErrors.push({ field: 'email', message: __('validation_invalid', { field: 'email' }) });
    }

    //TODO: check min chars ReferenceError: __ is not defined
    //  if (!v.isLength(addUser.password, 6)) {
    //      valErrors.push({ field: 'password', message: __('validation_invalid', { num: '6' }) });
    //  }
    if (valErrors.length > 0) {
        return callback({ code: 422, errors: valErrors });
    }

    // verify duplicated email
    User.findOne({ email: addUser.email }, function (err, user) {
        if (err) {
            return callback(err);
        }

        if (user) {
            return callback({ code: 409, message: __('USER_EMAIL_DUPLICATED') });
        } else {
            let hashedPassword = crypto.createHash('sha256').update(addUser.password).digest('base64');
            console.log('se ha hecho el hash', hashedPassword);
            addUser.password = hashedPassword;

            // create user
            new User(addUser).save(callback);
        }
    });
};

// create model
const User = mongoose.model('User', userSchema);

module.exports = User; 
