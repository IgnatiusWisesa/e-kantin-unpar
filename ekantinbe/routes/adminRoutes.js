const express = require('express');
const router = express.Router();
const { adminControllers } = require('../controllers');

/**
 * @routes POST admin/login
 * @description Admin login action
 * @access Admin
 */
router.post('/login', adminControllers.adminLogin);

module.exports = router;
