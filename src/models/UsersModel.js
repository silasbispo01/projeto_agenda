const mongoose = require('mongoose');
const { default: validator } = require('validator');
const bcrypyjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchema);

class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  } 

  async auth () {
    this.is_valid()

    if(this.errors.length > 0) return;

    let user_exist = await this.userExists();

    if(user_exist) {
      if (!bcrypyjs.compareSync(this.body.password, this.user.password)) {
        this.errors.push('Senha invalida!')
        this.user = null;
        return;
      }
    } else {
      this.errors.push('Usuário não encontrado!')
    }
  }

  async create () {
    this.is_valid();
    
    if(this.errors.length > 0) return;

    let user_exist = await this.userExists();

    if (user_exist) return this.errors.push('Usuário já existe!');

    const salt = bcrypyjs.genSaltSync();
    this.body.password = bcrypyjs.hashSync(this.body.password, salt);

    this.user = await UserModel.create(this.body);
  }
  
  async userExists() {
    this.user = await UserModel.findOne({email: this.body.email});

    if(this.user) return true

    return false
  }

  is_valid() {
    this.cleanUp();

    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
    if(this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('A Senha precisa estar ter entre 3 e 50 caracteres.')
    } 
  }

  cleanUp () {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    };
  }
}

module.exports = { User };
