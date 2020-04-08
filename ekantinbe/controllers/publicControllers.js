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
		const sqlStand = `
			SELECT 
				sp.profileId,
        sp.standName,
        sp.standContact,
        sp.standPhoto,
				sa.standAddress
      FROM
        stand_profile sp
          JOIN
            stand_address sa ON sa.profileId = sp.profileId`;

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
	 * @routes POST public/stand/details
	 * @description Public get stand profile & menu
	 * @access Public
	 */
	publicGetDetailStand: (req, res) => {
		// Get Stand Id
		const { profileId } = req.body; // req.body.data

		// Set SQL Syntax
		const sqlMenu = `
			SELECT 
				sp.profileId,
				sp.standName,
				sp.standContact,
				sp.standPhoto,
        sm.menuId, 
        sm.menuName, 
        sm.menuPrice, 
        sm.menuCategory, 
        sm.menuDesc
			FROM 
				stand_profile as sp
			JOIN
				stand_menu sm 
					ON sm.profileId = sp.profileId
      WHERE sp.profileId = ?`;

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
	 * @routes POST public/menu/food
	 * @description Public get all food menu
	 * @access Public
	 */
	publicGetFoodMenu: (req, res) => {
		// Set SQL Syntax
		const sqlFood = `
			SELECT
				sp.standName,
				sm.menuId,
				sm.profileId,
				sm.menuName,
				sm.menuPrice,
				sm.menuDesc
			FROM 
				stand_profile sp
			JOIN
				stand_menu sm 
					ON sm.profileId = sp.profileId
			WHERE sm.menuCategory = 'makanan'
			ORDER BY sm.menuName ACS `;

		// Database Action
		db.query(sqlFood, (err, foodResult) => {
			if (err) res.status(500).send(err);

			if (foodResult.length === 0) {
				return res.status(200).send({ error: true, message: 'Data tidak tersedia!' });
			} else {
				return res.status(200).send({ error: false, foodResult });
			}
		});
	},

	/**
	 * @routes POST public/menu/drink
	 * @description Public get all drink menu
	 * @access Public
	 */
	publicGetDrinkMenu: (req, res) => {
		// Set SQL Syntax
		const sqlDrink = `
			SELECT
				sp.standName,
				sm.menuId,
				sm.profileId,
				sm.menuName,
				sm.menuPrice,
				sm.menuDesc
			FROM 
				stand_profile sp
			JOIN
				stand_menu sm 
					ON sm.profileId = sp.profileId
			WHERE sm.menuCategory = 'minuman'
			ORDER BY sm.menuName ASC `;

		// Database Action
		db.query(sqlDrink, (err, drinkResult) => {
			if (err) res.status(500).send(err);

			if (drinkResult.length === 0) {
				return res.status(200).send({ error: true, message: 'Data tidak tersedia!' });
			} else {
				return res.status(200).send({ error: false, drinkResult });
			}
		});
	}
};
