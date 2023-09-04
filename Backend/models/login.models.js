const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  password:{
    type:String,
    require:true
  }
 
});

module.exports = mongoose.model("login", loginSchema);
