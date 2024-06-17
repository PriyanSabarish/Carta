const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
      type: String,
      default: "Sam Anderson",

  },
    location:{
      type: String,
      default: "California, USA",
    },
    password: {
        type: String,
        required: true
    },
    role:{
      type: String,
      required: true
    },
    username:{
      type: String,
      required: false
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
