const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddlewares = require('../middlewres/adminauth');
const membersController = require('../controllers/membersContoller');
const eventsController =require('../controllers/eventsController');
const categoriesController = require('../controllers/categoriesController');
const sermonsController = require('../controllers/sermonsController');
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
router.get('/admin/members/index',adminMiddlewares.notLoggedIn, membersController.index);
router.get('/admin/members/create', adminMiddlewares.notLoggedIn,membersController.create);
router.post('/admin/members/create', membersController.store);
router.get('/admin/members/view/:id',adminMiddlewares.notLoggedIn,membersController.show);
router.get('/admin/members/edit/:id',adminMiddlewares.notLoggedIn,membersController.edit);
router.post('/admin/members/edit/:id',adminMiddlewares.notLoggedIn,membersController.update);
router.get('/admin/members/delete/:id',adminMiddlewares.notLoggedIn,membersController.delete);

// Events Routes
router.get('/admin/events/index',adminMiddlewares.notLoggedIn,eventsController.index);
router.get('/admin/events/create',adminMiddlewares.notLoggedIn,eventsController.create);
router.post('/admin/events/create',eventsController.store);
router.get('/admin/events/view/:id',adminMiddlewares.notLoggedIn,eventsController.show);
router.get('/admin/events/edit/:id',adminMiddlewares.notLoggedIn,eventsController.edit);
router.post('/admin/events/edit/:id',adminMiddlewares.notLoggedIn,eventsController.update);
router.get('/admin/events/delete/:id',adminMiddlewares.notLoggedIn,eventsController.delete);

// Sermon Categories

router.get('/admin/categories/index',adminMiddlewares.notLoggedIn, categoriesController.index);
router.get('/admin/categories/create',adminMiddlewares.notLoggedIn, categoriesController.create);
router.post('/admin/categories/create',categoriesController.store);
router.get('/admin/categories/edit/:id',adminMiddlewares.notLoggedIn, categoriesController.edit);
router.post('/admin/categories/edit/:id',adminMiddlewares.notLoggedIn,categoriesController.update);
router.get('/admin/categories/delete/:id',adminMiddlewares.notLoggedIn,categoriesController.destroy);


//Sermons
router.get('/admin/sermons/index',adminMiddlewares.notLoggedIn,sermonsController.index);
router.get('/admin/sermons/create',adminMiddlewares.notLoggedIn,sermonsController.create);
router.post('/admin/sermons/create',sermonsController.store);
router.get('/admin/sermons/view/:id',adminMiddlewares.notLoggedIn,sermonsController.show);
router.get('/admin/sermons/edit/:id',adminMiddlewares.notLoggedIn,sermonsController.edit);
router.post('/admin/sermons/edit/:id',adminMiddlewares.notLoggedIn,sermonsController.update);
router.get('/admin/sermons/delete/:id',adminMiddlewares.notLoggedIn,sermonsController.destroy);





module.exports = router;