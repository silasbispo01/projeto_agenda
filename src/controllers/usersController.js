exports.user_login = (req, res) => {
  res.render("users/login")
}

exports.user_new_login = (req, res) => {
  const { UserLogin } = require("../models/UsersModel");
  login = new UserLogin(req.body);
  login.new();
  res.send(login.body);
}

exports.user_signup = (req, res) => {
  res.render("users/cadastro")
}

exports.user_new_signup = (req, res) => {
  const { UserRegister } = require("../models/UsersModel");
  register = new UserRegister(req.body);
  res.send(register.body);
}