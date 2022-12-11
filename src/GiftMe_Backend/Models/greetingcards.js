const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    name:{type:String},
    amount:Number,
    category:{type:String},
    img:{type:String},
},
{collection:'greetingcards'}
)

const card = mongoose.model("card",cardSchema);

module.exports = card;