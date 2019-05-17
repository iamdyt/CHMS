const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin and DashBoard Routes
router.get('/admin/dashboard', adminController.index);
router.get('/admin/signup', adminController.getSignup );
router.post('/admin/signup', adminController.postSignup);
router.get('/admin/signin', adminController.getSignin);
router.post('/admin/signin', adminController.postSignin);
router.get('/admin/account/:id', adminController.show);
router.post('/admin/account/:id',adminController.update);





module.exports = router;