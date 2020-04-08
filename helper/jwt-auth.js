const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = {
	auth: (req, res, next) => {
		// Get Token
		const token = req.token;

		// Validation Data
		if (token) {
			// Get Public Key
			let publicKEY = fs.readFileSync('./public.key', 'utf8');

			// JWT Action
			jwt.verify(token, publicKEY, { expiresIn: '6h', algorithm: ['RS256'] }, (err, decoded) => {
				if (err) {
					return res
						.status(401)
						.send({ message: 'User not authorized.', name: 'User not authorized.' });
				} else {
					console.log('decoded', decoded);
					req.user = decoded;
					next();
				}
			});
		} else {
			next();
		}
	}
};
