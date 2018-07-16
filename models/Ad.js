'use strict';

const mongoose = require('mongoose');

const fs = require('fs');

// define schema
const adSchema = mongoose.Schema({
  name: { type: String, index: true },
  sale: { type: Boolean, index: true },
  price: { type: Number, index: true },
  photo: { type: String, index: true },
  tags: { type: [{ type: String, index: true, enum: ['work', 'lifestyle', 'motor', 'mobile'] }] }
});

/**
 * model static methods
 */

// filter list
adSchema.statics.list = function (filter, skip, limit, fields, sort, tags) {

    // create query with desired filters
    const query = Ad.find(filter);
    query.select(fields);

    // add pagination
    query.skip(skip);
    query.limit(limit);

    // db sort is executed before the pagination
    query.sort(sort);

    // execute query and return promise
    return query.exec(tags);
}

// filter by tag
adSchema.statics.tagList = (tags) => {
    const query = Ad.distinct('tags');
    query.exec(tags);
};

/**
 * List of permitted tags
 */
adSchema.statics.allowedTags = function () {
    return ['work', 'lifestyle', 'motor', 'mobile'];
/**
 * load json ads
 */
adSchema.statics.loadJson = async function (file) {
  // Use a callback function with async/await
  const data = await new Promise((resolve, reject) => {
    // Encodings: https://nodejs.org/api/buffer.html
    fs.readFile(file, { encoding: 'utf8' }, (err, data) => {
      return err ? reject(err) : resolve(data);
    });
  });


  if (!data) {
    throw new Error(file + ' is empty!');
  }

  const ads = JSON.parse(data).ads;
  const numAds = ads.length;

  for (var i = 0; i < ads.length; i++) {
    await (new Ad(ads[i])).save();
  }

  return numAds;

};

// create model
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
