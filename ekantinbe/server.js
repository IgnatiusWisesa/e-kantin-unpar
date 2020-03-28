// Import global module
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Set App
const app = express();

// Check database connection
const db = require('./database/db');
db.connect(err => {
	if (err) throw err;
	console.log('MySql connected...');
});

// Parse application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application / json
app.use(bodyParser.json());

// Set cors
app.use(cors());

// Set routes
app.get('/', (req, res) => res.send('Server is running...'));

// Set PORT
const PORT = process.env.PORT || 1919;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
