const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/userDetails");
const plm=require("passport-local-mongoose")

const userSchema=mongoose.Schema({
  username:String,
  email:String,
  message:String
});
userSchema.plugin(plm);

module.exports=mongoose.model("users",userSchema);