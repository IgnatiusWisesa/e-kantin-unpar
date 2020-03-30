// Import Database
const db = require('../database/db');

module.exports = {
	/**
	 * @routes POST admin/login
	 * @description Admin login action
	 * @access Admin
	 */
	adminLogin: (req, res) => {
		// Get email & password
		const { adminMail, adminPassword } = req.body.data;

		// Validation email and password
		if (adminMail === undefined || adminPassword === undefined) {
			return res
				.status(200)
				.send({ error: true, message: 'Kolom email/password tidak boleh kosong!' });
		} else {
			// Set SQL Syntax
			const sqlLogin = 'SELECT * FROM admin WHERE adminMail = ? AND adminPassword = ?';

			// Database Action
			db.query(sqlLogin, [adminMail, adminPassword], (err, loginResult) => {
				if (err) res.status(200).send(err);

				if (loginResult.length === 0) {
					return res
						.status(200)
						.send({ error: true, message: 'Email yang anda masukkan tidak terdaftar!' });
				} else {
					return res.status(200).send({ error: false, result: loginResult[0] });
				}
			});
		}
	}
};
