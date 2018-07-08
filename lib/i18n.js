'use strict';

var i18n = require('i18n');

i18n.configure({
	// where to store json files - defaults to './locales' relative to modules directory
	directory: __dirname + '/locales',
  
	//defaultLocale: 'en',
  
	// sets a custom cookie name to parse locale settings from  - defaults to NULL
	cookie: 'lang',
});
    
module.exports = function(req, res, next) {

	i18n.init(req, res);

	next();
};