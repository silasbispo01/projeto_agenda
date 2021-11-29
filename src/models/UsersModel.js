const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String
});

const LoginSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String
});

const RegisterModel = mongoose.model('Register', RegisterSchema);
const LoginModel = mongoose.model('Login', LoginSchema);

class UserRegister {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
}

class UserLogin {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  new (){
    this.checkUser();
  }

  checkUser () {
    this.cleanUp();
    // Email precisa ser valido
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

module.exports = { UserLogin, UserRegister };
