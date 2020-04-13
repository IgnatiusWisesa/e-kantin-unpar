const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

module.exports = payload => {
	// Secret Key
	let privateKEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
	return jwt.sign(payload, privateKEY, { expiresIn: '6h', algorithm: 'RS256' });
};
