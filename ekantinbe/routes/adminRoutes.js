const express = require('express');
const router = express.Router();
const { adminControllers } = require('../controllers');

/**
 * @routes POST admin/login
 * @description Admin login action
 * @access Admin
 */
router.post('/login', adminControllers.adminLogin);

/**
 * @routes POST admin/stand
 * @description Admin get stand list
 * @access Admin
 */
router.post('/stand', adminControllers.adminGetListStand);

/**
 * @routes POST admin/edit-stand-profile
 * @description Admin edit profile stand action
 * @access Admin
 */
router.post('/edit-stand-profile', adminControllers.adminEditProfileStand);

/**
 * @routes POST admin/delete-stand
 * @description Admin delete stand action
 * @access Admin
 */
router.post('/delete-stand', adminControllers.adminDeleteStand);

/**
 * @routes POST admin/menu
 * @description Admin get all menu
 * @access Admin
 */
router.post('/menu', adminControllers.adminGetStandMenu);

module.exports = router;
