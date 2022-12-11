const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const ordersSchema = new Schema({
    user_id: String,
    products: [
        {
            productId: [{
                type: ObjectId,
                ref: "card",
            }],
            total: String
        }
    ],
},
{collection:'orderscart'})

const orders = mongoose.model("orders",ordersSchema);

module.exports = orders;