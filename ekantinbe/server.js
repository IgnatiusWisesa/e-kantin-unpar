// Import global module
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const http = require('http');
require('dotenv').config();

// Set App
const app = express();

// Set cors
app.use(cors());

// Add headers
app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'https://ekantin-unpar.com');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

// Set routes
const { adminRoutes, publicRoutes } = require('./routes');
app.get('/', (req, res) => res.status(200).send('Server e-kantin Unpar is running...'));
app.use('/admin', adminRoutes);
app.use('/public', publicRoutes);

// Parse application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application / json
app.use(bodyParser.json());

// Set Token
app.use(bearerToken());

// Set Static File
app.use(express.static('public'));

// Check database connection
const db = require('./database/db');
db.connect(err => {
	if (err) throw err;
	console.log('MySql connected...');
});

// Set PORT
const PORT = process.env.PORT || 1919;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
