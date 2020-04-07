const express = require('express');
const router = express.Router();
const { adminControllers } = require('../controllers');

/**
 * @routes POST admin/register
 * @description Admin register action
 * @access Admin
 */
router.post('/register', adminControllers.adminRegister);

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
 * @routes POST admin/add-stand
 * @description Admin create a new stand
 * @access Admin
 */
router.post('/add-stand', adminControllers.adminAddStand);

/**
 * @routes POST admin/edit-stand-profile
 * @description Admin edit profile stand action
 * @access Admin
 */
router.post('/edit-stand-profile', adminControllers.adminEditProfileStand);

/**
 * @routes POST admin/edit-stand-photo
 * @description Admin edit photo stand action
 * @access Admin
 */
router.post('/edit-stand-photo', adminControllers.adminEditPhotoStand);

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

/**
 * @routes POST admin/add-menu
 * @description Admin create a new menu
 * @access Admin
 */
router.post('/add-menu', adminControllers.adminAddStandMenu);

/**
 * @routes POST admin/edit-menu
 * @description Admin update a menu
 * @access Admin
 */
router.post('/edit-menu', adminControllers.adminEditStandMenu);

/**
 * @routes POST admin/delete-menu
 * @description Admin delete a menu
 * @access Admin
 */
router.post('/delete-menu', adminControllers.adminDeleteStandMenu);

module.exports = router;
