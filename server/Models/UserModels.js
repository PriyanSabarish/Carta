const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
      type: String,
      required: true
    }
});


userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        console.log("password matched" + user)
        return user;
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect email");
  };




module.exports = mongoose.model('User', userSchema);
