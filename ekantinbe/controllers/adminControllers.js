// Import Database
const db = require('../database/db');

module.exports = {
	/**
	 * @routes POST admin/login
	 * @description Admin login action
	 * @access Admin
	 */
	adminLogin: (req, res) => {
		// Get Email And Password
		const { adminMail, adminPassword } = req.body; // req.body.data

		// Validation Email And Password
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
	},

	/**
	 * @routes POST admin/stand
	 * @description Admin get stand list
	 * @access Admin
	 */
	adminGetListStand: (req, res) => {
		// Set SQL Syntax
		const sqlStand = `
			SELECT 
				sp.profileId, 
				sp.standName, 
				sp.standContact, 
				sp.standPhoto
			FROM stand_profile sp`;

		// Database Action
		db.query(sqlStand, (err, standResult) => {
			if (err) res.status(500).send(err);

			if (standResult.length === 0) {
				return res.status(200).send({ error: true, message: 'Data tidak tersedia!' });
			} else {
				return res.status(200).send({ error: false, standResult });
			}
		});
	},

	/**
	 * @routes POST admin/edit-stand-profile
	 * @description Admin edit profile stand action
	 * @access Admin
	 */
	adminEditProfileStand: (req, res) => {
		// Get New Data Stand & Profile Id
		const { profileId, standName, standContact } = req.body; // req.body.data

		// Validation Data
		if (
			standName === undefined ||
			standName === '' ||
			standContact === undefined ||
			standContact === ''
		) {
			return res.status(500).send({ error: true, message: 'Data tidak boleh kosong!' });
		} else {
			// Set Data
			const data = {
				standName,
				standContact
			};

			// Set SQL Syntax
			const sqlEditStand = `UPDATE stand_profile sp SET ? WHERE sp.profileId = ?`;

			// Database Action
			db.query(sqlEditStand, [data, parseInt(profileId)], (err, editStandResult) => {
				if (err) res.status(500).send({ error: err });

				if (editStandResult.affectedRows === 0) {
					return res
						.status(200)
						.send({ error: true, message: 'Data tidak berhasil di update!' });
				} else {
					return res.status(200).send({ error: false, message: 'Data berhasil di update!' });
				}
			});
		}
	},

	/**
	 * @routes POST admin/delete-stand
	 * @description Admin delete stand action
	 * @access Admin
	 */
	adminDeleteStand: (req, res) => {
		// Get Profie Id
		const { profileId } = req.body; // req.body.data

		// Set SQL Syntax
		const sqlDeleteStand = `DELETE FROM stand_profile sp WHERE sp.profileId = ?`;

		// Database Action
		db.query(sqlDeleteStand, parseInt(profileId), (err, deleteResult) => {
			if (err) res.status(500).send({ error: true, err });

			if (deleteResult.affectedRows === 0) {
				return res.status(200).send({ error: true, message: 'Data tidak di hapus!' });
			} else {
				return res.status(200).send({ error: false, message: 'Data berhasil di hapus!' });
			}
		});
	},

	/**
	 * @routes POST admin/menu
	 * @description Admin get all menu
	 * @access Admin
	 */
	adminGetStandMenu: (req, res) => {
		// Get Profile Id
		const { profileId } = req.body; // req.body.data

		// Set SQL Syntax
		const sqlMenu = `
			SELECT 
				sm.menuId, 
				sm.menuName, 
				sm.menuPrice, 
				sm.menuDesc 
			FROM 
				stand_menu sm 
			WHERE sm.profileId = ?`;

		// Database Action
		db.query(sqlMenu, parseInt(profileId), (err, menuResult) => {
			if (err) res.status(500).send(err);

			if (menuResult.length === 0) {
				return res.status(200).send({ error: true, message: 'Data tidak tersedia!' });
			} else {
				return res.status(200).send({ error: false, menuResult });
			}
		});
	}
};
