exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.notices = req.flash('notices');
  res.locals.user = req.session.user;
  res.locals.csrfToken = req.csrfToken();

  next();
};

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash('errors', 'Você precisa fazer login.');
    req.session.save()
    res.redirect('/')
    return 
  }
  next();
};
