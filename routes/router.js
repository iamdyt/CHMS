const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddlewares = require('../middlewres/adminauth');
const membersController = require('../controllers/membersContoller');

// Admin and DashBoard Routes
router.get('/admin/dashboard',adminMiddlewares.notLoggedIn, adminController.index);
router.get('/admin/signup', adminMiddlewares.isLoggedIn, adminController.getSignup );
router.post('/admin/signup', adminController.postSignup);
router.get('/admin/signin', adminMiddlewares.isLoggedIn, adminController.getSignin);
router.post('/admin/signin', adminController.postSignin);
router.get('/admin/account/:id',adminMiddlewares.notLoggedIn, adminController.show);
router.post('/admin/account/:id',adminController.update);
router.get('/admin/logout',adminMiddlewares.notLoggedIn,adminController.logout);

//Members Routes

router.get('/admin/members/index', membersController.index);
router.get('/admin/members/create', adminMiddlewares.notLoggedIn,membersController.create);
router.post('/admin/members/create', membersController.store);





module.exports = router;