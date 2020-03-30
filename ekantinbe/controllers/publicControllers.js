// Import Database
const db = require('../database/db');

module.exports = {
	/**
	 * @routes POST public/stand
	 * @description Public get list stand
	 * @access Public
	 */
	publicGetListStand: (req, res) => {
		// Set SQL Syntax
		const sql = `
			SELECT 
				sp.profileId,
        sp.standName,
        sp.standContact,
        sp.standPhoto
      FROM
        stand_profile sp
          JOIN
            stand_address sa ON sa.profileId = sp.profileId`;

		// Database Action
		db.query(sql, (err, standResult) => {
			if (err) res.status(500).send(err);

			if (standResult.length === 0) {
				return res.status(200).send({ error: true, message: 'Data tidak tersedia!' });
			} else {
				return res.status(200).send({ error: false, listStands: standResult });
			}
		});
	},

	/**
	 * @routes POST public/stand-items
	 * @description Public get list stand items
	 * @access Public
	 */
	publicGetItemsStand: (req, res) => {
		// Get Stand Id
		const profileId = parseInt(req.body.profileId);

		// Set SQL Syntax
		const sqlItems = `
      SELECT 
        si.itemId, 
        si.itemName, 
        si.itemPrice, 
        si.itemDesc, 
        si.itemPhoto 
      FROM stand_items si 
      WHERE si.profileId = ?;`;

		// Database Action
		db.query(sqlItems, profileId, (err, itemsResult) => {
			if (err) res.status(500).send(err);

			if (itemsResult.length === 0) {
				return res.status(200).send({ error: true, message: 'Data tidak tersedia!' });
			}
		});
	}
};
