// Import Database
const db = require('../database/db');
const paginate = require('jw-paginate');
const cryptoGenerate = require('../helper/encrypt');
const jwtGenerate = require('../helper/jwt');
const { auth } = require('../helper/jwt-auth');
const { uploader } = require('../helper/uploader');

module.exports = {
	/**
	 * @routes POST admin/register
	 * @description Admin register action
	 * @access Admin
	 */
	adminRegister: (req, res) => {
		// Get Email And Password
		const { adminMail, adminPassword } = req.body; // req.body.data

		// Validation Email And Password
		if (
			adminMail === undefined ||
			adminMail === '' ||
			adminPassword === undefined ||
			adminMail === ''
		) {
			return res
				.status(200)
				.send({ error: true, message: 'Kolom email/password tidak boleh kosong!' });
		} else {
			// Set Data
			const data = {
				adminMail,
				adminPassword: cryptoGenerate(adminPassword)
			};

			// Set SQL Syntax
			const sqlRegister = 'INSERT INTO admin SET ?';

			// Database Action
			db.query(sqlRegister, data, (err, registerResutl) => {
				if (err) res.status(500).send(err);

				if (registerResutl.indertId === 0) {
					return res.status(200).send({ error: true, message: 'Registrasi admin gagal' });
				} else {
					return res.status(200).send({ error: false, message: 'Registrasi admin berhasil!' });
				}
			});
		}
	},

	/**
	 * @routes POST admin/login
	 * @description Admin login action
	 * @access Admin
	 */
	adminLogin: (req, res) => {
		// Get Email And Password
		const { adminMail, adminPassword } = req.body; // req.body.data

		// Validation Email And Password
		if (
			adminMail === undefined ||
			adminMail === '' ||
			adminPassword === undefined ||
			adminMail === ''
		) {
			return res
				.status(200)
				.send({ error: true, message: 'Kolom email/password tidak boleh kosong!' });
		} else {
			// Set SQL Syntax
			const sqlLogin =
				'SELECT a.adminId, a.adminMail, a.adminRole FROM admin a WHERE a.adminMail = ? AND a.adminPassword = ?';

			// Database Action
			db.query(sqlLogin, [adminMail, cryptoGenerate(adminPassword)], (err, loginResult) => {
				if (err) res.status(500).send(err);

				if (loginResult.length === 0) {
					return res
						.status(200)
						.send({ error: true, message: 'Email yang anda masukkan tidak terdaftar!' });
				} else {
					// Create token
					const token = jwtGenerate({
						adminId: loginResult[0].adminId,
						adminMail: loginResult[0].adminMail,
						adminRole: loginResult[0].adminRole
					});

					return res.status(200).send({ token, error: false, result: loginResult[0] });
				}
			});
		}
	},

	/**
	 * @routes POST admin/keep-login
	 * @description Admin keep login action
	 * @access Admin
	 */
	adminKeepLogin: (req, res) => {
		// Get Admin Id After Verify Token
		const adminId = parseInt(req.user.adminId);

		// Set SQL Syntax
		const sqlKeepLogin =
			'SELECT a.adminId, a.adminMail, a.adminRole FROM admin a WHERE a.adminId = ?';

		// Database Action
		db.query(sqlKeepLogin, adminId, (err, keepResult) => {
			if (err) return res.status(500).send(err);

			if (keepResult.length === 0) {
				return res
					.status(200)
					.send({ error: true, message: 'Email yang anda masukkan tidak terdaftar!' });
			} else {
				// Create token
				const token = jwtGenerate({
					adminId: keepResult[0].adminId,
					adminMail: keepResult[0].adminMail,
					adminRole: keepResult[0].adminRole
				});

				return res.status(200).send({ token, error: false, result: keepResult[0] });
			}
		});
	},

	/**
	 * @routes POST admin/stand
	 * @description Admin get stand list
	 * @access Admin
	 */
	adminGetListStand: (req, res) => {
		// Set SQL Syntax
		const sqlCount = 'SELECT COUNT(*) AS count FROM stand_profile';

		// Database Action
		db.query(sqlCount, (err, countResult) => {
			if (err) return res.status(500).send(err);

			// Collection Data Count
			const dataCount = countResult[0].count;

			// Get Page or Default to First Page
			const page = parseInt(req.body.page) || 1;

			// Set Page Size
			const pageSize = 3;

			// Get Pager Object for Specified Page
			const pager = paginate(dataCount, page, pageSize);

			// Set Limit Data
			let offset;

			if (page === 1) {
				offset = 0;
			} else {
				offset = pageSize * (page - 1);
			}

			// Set SQL Syntax
			const sqlStand = `
				SELECT 
					sp.profileId, 
					sp.standName, 
					sp.standContact, 
					sp.standPhoto,
					sa.standAddress
				FROM stand_profile sp
					JOIN
						stand_address sa ON sa.profileId = sp.profileId
				LIMIT ? OFFSET ?`;

			// Database Action
			db.query(sqlStand, [pageSize, offset], (err, standResult) => {
				if (err) res.status(500).send(err);

				if (standResult.length === 0) {
					return res.status(200).send({ error: true, message: 'Data tidak tersedia!' });
				} else {
					// Collection Data Stand
					const pageOfData = standResult;
					return res.status(200).send({ error: false, standResult, pager });
				}
			});
		});
	},

	/**
	 * @routes POST admin/add-stand
	 * @description Admin create a new stand
	 * @access Admin
	 */
	adminAddStand: (req, res) => {
		// Get Data Stand
		const { standName, standContact, standAddress } = req.body; // req.body.data

		// Validation Data
		if (
			standName === undefined ||
			standName === '' ||
			standContact === undefined ||
			standContact === '' ||
			standAddress === undefined ||
			standAddress === ''
		) {
			return res.status(200).send({ error: true, message: 'Data tidak boleh kosong!' });
		} else {
			// Set Data For stand_profile table
			let data = {
				standName,
				standContact,
				standPhoto: 'img1586087837004.retail-store-icon.png'
			};

			// Set SQL Syntax
			const sqlAddStand = 'INSERT INTO stand_profile SET ?';

			// Database Action
			db.query(sqlAddStand, data, (err, addProfileResult) => {
				if (err) res.status(500).send(err);

				if (addProfileResult.insertId === 0) {
					return res
						.status(200)
						.send({ error: true, message: 'Data tidak berhasil di tambah!' });
				} else {
					// Set Data For stand_address table
					data = {
						profileId: addProfileResult.insertId,
						standAddress
					};

					// Set SQL Syntax
					const sqlAddAddress = 'INSERT INTO stand_address SET ?';

					// Database Action
					db.query(sqlAddAddress, data, (err, addAddressResult) => {
						if (err) return res.status(500).send(err);

						if (addAddressResult.insertId === 0) {
							return res
								.status(200)
								.send({ error: true, message: 'Data tidak berhasil di tambah!' });
						} else {
							return res
								.status(200)
								.send({ error: false, message: 'Data berhasil di tambah!' });
						}
					});
				}
			});
		}
	},

	/**
	 * @routes POST admin/edit-stand-profile
	 * @description Admin edit profile stand action
	 * @access Admin
	 */
	adminEditProfileStand: (req, res) => {
		// Get New Data Stand & Profile Id
		const { profileId, standName, standContact, standAddress } = req.body; // req.body.data

		// Validation Data
		if (
			standName === undefined ||
			standName === '' ||
			standContact === undefined ||
			standContact === '' ||
			standAddress === undefined ||
			standAddress === ''
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
				if (err) return res.status(500).send({ error: err });

				// Set Data
				const data = {
					standAddress
				};

				// Ser SQL Syntax
				const sqlEditAddress = 'UPDATE stand_address sa SET ? WHERE sa.profileId = ?';

				// Database Action
				db.query(sqlEditAddress, [data, parseInt(profileId)], (err, editAddressResult) => {
					if (err) return res.status(500).send(err);

					if (editAddressResult.affectedRows === 0) {
						return res
							.status(200)
							.send({ error: true, message: 'Data tidak berhasil di update!' });
					} else {
						return res
							.status(200)
							.send({ error: false, message: 'Data berhasil di update!' });
					}
				});
			});
		}
	},

	/**
	 * @routes POST admin/edit-stand-photo
	 * @description Admin edit photo stand action
	 * @access Admin
	 */
	adminEditPhotoStand: (req, res) => {
		// Set Path
		const path = '/images';

		// Multer Action
		const upload = uploader(path, 'standimg').fields([{ name: 'standImage' }]);

		upload(req, res, err => {
			if (err)
				return res.status(500).send({ error: err.message, message: 'Upload foto gagal!' });

			// Get Image After Multer Process
			const { standImage } = req.files;

			if (standImage === undefined) {
				return res.status(200).send({ error: true, message: 'Foto tidak berhasil di update!' });
			} else {
				// Get Stand Profile Id
				const profileId = JSON.parse(req.body.standId);

				// Set Data
				const newPhoto = {
					standPhoto: standImage[0].filename
				};

				// Set SQL Syntax
				const sqlUpdatePhoto = 'UPDATE stand_profile SET ? WHERE profileId = ?';

				// Database Action
				db.query(sqlUpdatePhoto, [newPhoto, parseInt(profileId)], (err, updateResult) => {
					if (err) return res.status(500).send(err);

					if (updateResult.affectedRows === 0) {
						return res
							.status(200)
							.send({ error: true, message: 'Foto tidak berhasil di update!' });
					} else {
						return res.status(200).send({ erro: false, message: 'Foto berhasil di update!' });
					}
				});
			}
		});
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
				sm.menuDesc,
				sm.menuCategory
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
	},

	/**
	 * @routes POST admin/add-menu
	 * @description Admin create a new menu
	 * @access Admin
	 */
	adminAddStandMenu: (req, res) => {
		// Get Data Menu
		const { profileId, menuName, menuPrice, menuCategory, menuDesc } = req.body; // req.body.data

		// Validation Data
		if (
			profileId === undefined ||
			profileId === 0 ||
			menuName === undefined ||
			menuName === '' ||
			menuPrice === undefined ||
			menuPrice === '' ||
			menuCategory === undefined ||
			menuCategory === '' ||
			menuDesc === undefined ||
			menuDesc === ''
		) {
			return res.status(200).send({ error: true, message: 'Data tidak boleh kosong!' });
		} else {
			// Set Data
			const data = {
				profileId,
				menuName,
				menuPrice,
				menuCategory,
				menuDesc
			};

			// Set SQL Syntax
			const sqlAddMenu = `INSERT INTO stand_menu SET ?`;

			// Database Action
			db.query(sqlAddMenu, data, (err, addResult) => {
				if (err) res.status(500).send(err);

				if (addResult.insertId === 0) {
					return res
						.status(200)
						.send({ error: true, message: 'Data tidak berhasil di tambah!' });
				} else {
					return res.status(200).send({ error: false, message: 'Data berhasil di tambah!' });
				}
			});
		}
	},

	/**
	 * @routes POST admin/edit-menu
	 * @description Admin update a menu
	 * @access Admin
	 */
	adminEditStandMenu: (req, res) => {
		// Get Data Update
		const { menuId } = req.body; // req.body.data

		// Set Data
		const { profileId, menuName, menuDesc, menuCategory, menuPrice } = req.body.data; // req.body.data
		const data = {
			profileId: parseInt(profileId),
			menuName,
			menuPrice,
			menuCategory,
			menuDesc
		};

		// Set SQL Syntax
		const sqlUpdateMenu = `UPDATE stand_menu sm SET ? WHERE sm.menuId = ?`;

		// Database Action
		db.query(sqlUpdateMenu, [data, parseInt(menuId)], (err, updateResult) => {
			if (err) res.status(500).send(err);

			if (updateResult.affectedRows === 0) {
				return res.status(200).send({ error: true, message: 'Data gagal di update!' });
			} else {
				return res.status(200).send({ error: false, message: 'Data berhasil di update!' });
			}
		});
	},

	/**
	 * @routes POST admin/delete-menu
	 * @description Admin delete a menu
	 * @access Admin
	 */
	adminDeleteStandMenu: (req, res) => {
		// Get Menu Id
		const { menuId } = req.body; // req.body.data

		// Set SQL Syntax
		const sqlDeleteMenu = `DELETE FROM stand_menu sm WHERE sm.menuId = ?`;

		// Database Action
		db.query(sqlDeleteMenu, parseInt(menuId), (err, deleteResult) => {
			if (err) res.status(500).send(err);

			if (deleteResult.affectedRows === 0) {
				return res.status(200).send({ error: true, message: 'Data gagal di hapus!' });
			} else {
				return res.status(200).send({ error: false, message: 'Data berhasil di hapus!' });
			}
		});
	}
};
