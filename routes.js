const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const usersController = require('./src/controllers/usersController');

// Rotas da home
route.get('/', homeController.show_home);

// Users
route.get('/login', usersController.user_login);
route.get('/cadastro', usersController.user_signup);
route.post('/login/new', usersController.user_new_login);
route.post('/cadastro/new', usersController.user_new_signup);

module.exports = route;
