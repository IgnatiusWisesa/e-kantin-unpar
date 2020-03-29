const express = require('express');
const router = express.Router();
const { publicControllers } = require('../controllers');

/**
 * @routes POST public/stand
 * @description Public get list stand
 * @access Public
 */
router.post('/stand', publicControllers.publicGetListStand);

module.exports = router;
