const { ContactsModel, Contato } = require('../models/ContactsModel');

exports.show_contacts = async (req, res) => {
  if(!req.session.user) return res.redirect("/")
  res.locals.contacts = await ContactsModel.find()
  res.render("contacts/show_contatos")
}

exports.create_contacts = async (req, res) => {
  try {

    const contato = new Contato(req.body);
    
    await contato.create();
    
    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save();
      res.redirect('/contatos')
      return;
    }
    
    req.flash('notices', 'Login efetuado com sucesso!');
    return res.redirect('/contatos');
  } catch(e) {
    console.log(e)
    return res.redirect('/')
  }
}