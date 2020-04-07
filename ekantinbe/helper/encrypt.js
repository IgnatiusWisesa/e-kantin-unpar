const crypto = require('crypto');

module.exports = password => {
	return crypto
		.createHmac('sha256', '1234567890')
		.update(password)
		.digest('hex');
};
