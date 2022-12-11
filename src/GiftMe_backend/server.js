
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const user = require('./Models/users');
const card = require('./Models/greetingcards');
const cart = require('./Models/cart')
const app = express();
const cors = require('cors');
const { Auth } = require("two-step-auth");
const {sendotp, signin, signup, insertcard, getcards, updatecart, paymentIntent, deleteCart, getcart, updateorders, getorders} = require('../Back-end/controller/script')
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const port = 8080;
var otp;

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51M46QHCGxBdl6xbusotcftC7E6v6Q1Uv7IY9PxYZtaD2GxPDNC0mZ6UKWDt5mowdOdT8MC0rPxS0Nk1zxFFNj1N600x1qmMxvk')

const corsOptions ={
    origin:'http://localhost:4200', 
    credentials:true, 
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded());

mongoose.connect('mongodb://127.0.0.1:27017/giftme' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("DB Connected")
  }).catch(error=>{console.log('Error Occured while connecting to database : ',error)});
// mongoose.connect('mongodb://localhost:27017/giftme',{useUnifiedTopology:true})
       

const db = mongoose.connection;
db.once("open",()=>{
    console.log('Connected Successfully!')
})

app.post('/api/otp', sendotp)
app.post('/api/signin', signin)
app.post('/api/signup', signup)
app.post('/api/insertcard', insertcard)
app.get('/api/getcards', getcards)
app.post('/api/updatecart', updatecart)
app.post('/api/payment-intent', paymentIntent)
app.post('/api/delete-cart', deleteCart)
app.get('/api/getcart/:id', getcart)
app.post('/api/updateorders', updateorders)
app.get('/api/getorders/:id', getorders)

app.listen(port,()=>{
    console.log(`listening to the port ${port}`)
});








