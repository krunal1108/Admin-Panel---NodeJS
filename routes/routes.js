const express = require('express');
const controlToRoute = require('../controllers/controller')
const routes = express.Router();
const upload = require('../config/multerConfig');


routes.get('/', controlToRoute.defaultController);
routes.get('/signup', controlToRoute.signupController);
routes.post('/signup', controlToRoute.postSignupController);
routes.get('/login', controlToRoute.loginController);
routes.post('/login', controlToRoute.PostLoginController);
routes.get('/profile', controlToRoute.profileController);
// routes.post('/profile', controlToRoute.postProfileController);



module.exports = routes;