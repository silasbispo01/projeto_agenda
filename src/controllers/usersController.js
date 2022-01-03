const { User } = require("../models/UsersModel");

exports.user_login = (req, res) => {
  if(req.session.user) return res.redirect("/")
  res.render("users/show_login")
}

exports.user_signup = (req, res) => {
  if(req.session.user) return res.redirect("/")
  res.render("users/show_cadastro")
}

exports.user_logout = (req, res) => {
  req.session.destroy();
  res.redirect("/")
}

exports.user_new_session = async (req, res) => {
  try {
    let user = new User(req.body);

    await user.auth();
    
    if(user.errors.length > 0) {
      req.flash('errors', user.errors);
      req.session.save();
      res.redirect('/login')
      return;
    }
    
    req.flash('notices', 'Login efetuado com sucesso!');
    req.session.user = user.user;
    
    return res.redirect('/');
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
}


exports.user_new_signup = async (req, res) => {
  try {
    let user = new User(req.body);
    await user.create();
    
    if(user.errors.length > 0) {
      req.flash('errors', user.errors);
      req.session.save();
      res.redirect("/cadastro")
      return;
    }
    
    req.flash('notices', 'Usuário criado com sucesso!');
    return res.redirect('/');
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
}