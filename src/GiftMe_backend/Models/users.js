const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type: String,unique:true},
    gender:String,
    email:{type: String,unique:true},
    password:{type: String},
    admin:{type: Boolean,default: false}
},
{collection:'users'}
)

const user = mongoose.model("user",userSchema);

module.exports = user;