const express = require('express');
const router = express.Router();
const { publicControllers } = require('../controllers');

/**
 * @routes POST public/stand
 * @description Public get list stand
 * @access Public
 */
router.post('/stand', publicControllers.publicGetListStand);

/**
 * @routes POST public/stand/details
 * @description Public get stand profile & menu
 * @access Public
 */
router.post('/stand/details', publicControllers.publicGetDetailStand);

/**
 * @routes POST public/menu/food
 * @description Public get all food menu
 * @access Public
 */
router.post('/menu/food', publicControllers.publicGetFoodMenu);

/**
 * @routes POST public/menu/drink
 * @description Public get all drink menu
 * @access Public
 */
router.post('/menu/drink', publicControllers.publicGetDrinkMenu);

module.exports = router;
