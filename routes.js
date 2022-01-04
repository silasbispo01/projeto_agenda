const express = require('express');

const route = express.Router();

const homeController = require('./src/controllers/homeController');
const usersController = require('./src/controllers/usersController');
const contactsController = require('./src/controllers/contactsController');

//Mid
const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.show_home);

// Rotas de Login
route.get('/login', usersController.user_login);
route.get('/cadastro', usersController.user_signup);
route.post('/login/new', usersController.user_new_session);
route.post('/cadastro/new', usersController.user_new_signup);
route.get("/logout", loginRequired, usersController.user_logout);


// Rotas de contato
route.get('/contatos', loginRequired, contactsController.show_contacts);
route.post('/contatos/new', loginRequired, contactsController.create_contacts);

module.exports = route;
