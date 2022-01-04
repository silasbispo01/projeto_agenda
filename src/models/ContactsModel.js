const mongoose = require('mongoose');
const { default: validator } = require('validator');

const ContactsSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const ContactsModel = mongoose.model('Contacts', ContactsSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.create = async function() {
  this.is_valid();

  if(this.errors.length > 0) return;

  this.contato = await ContactsModel.create(this.body)
}

Contato.prototype.is_valid = function() {
  this.cleanUp();

  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
  if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.')
  if(!this.body.email && !this.body.telefone) this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.')
}

Contato.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    telefone: this.body.telefone,
    email: this.body.email,
  };
}

module.exports =  {
  Contato, 
  ContactsModel
}
