'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const consign = require('consign');

module.exports.getapp = function () {

	app.set('port', (process.env.PORT || 5000))

	//serve static files in the public directory
	app.use(express.static('public'));

	// Process application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({
		extended: false
	}))

	// Process application/json
	app.use(bodyParser.json());

	consign()
		.include('./config/tokens.js')
		.then('apis')
		.into(app);

	return app;

}

