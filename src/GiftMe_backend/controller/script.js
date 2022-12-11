const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const user = require('../Models/users');
const card = require('../Models/greetingcards');
const cart = require('../Models/cart')
const orders = require('../Models/orders')
const app = express();
const cors = require('cors');
let client = require('@sendgrid/mail')

const { Auth } = require("two-step-auth");
client.setApiKey('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');
const Stripe = require('stripe');
const { async } = require('rxjs');
const stripe = Stripe('sk_test_51M46QHCGxBdl6xbusotcftC7E6v6Q1Uv7IY9PxYZtaD2GxPDNC0mZ6UKWDt5mowdOdT8MC0rPxS0Nk1zxFFNj1N600x1qmMxvk')

exports.sendotp = async (req, res) => {
  let email = req.body.email;

  // client.send({
  //     to:{
  //         email:'maheswarreddyperam@gmail.com',
  //         name: 'GiftME'
  //     },
  //     from:{email: 'peramm@mail.gvsu.edu',
  //     to:'GIFTME'
  // },
  // templatedId:'d-d70b4b9105d84c6eab5f41b68eae24ea',
  // dynamicTemplateData:{
  //     name:'Mahi!!'
  // }
  // }).then(()=>{
  //     console.log("we are done with sending....")
  // })

  const msg = {
    to: 'peramm@mail.gvsu.edu',
    from: 'peramm@mail.gvsu.edu', // Use the email address or domain you verified above
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  //ES6
  client
    .send(msg)
    .then(() => { }, error => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    });
  //ES8
  (async () => {
    try {
      await client.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    }
  })();

  // try{
  //     const otp_response = await Auth(email, "Giftme.com");
  //     otp = otp_response.OTP; 
  //     res.send({status:'ok',message:'OTP has been sent!'})
  // }
  // catch(error){
  //     res.send({status:'error',message:error})
  // }
}

exports.signin = async (req, res) => {
  let details = await user.findOne({ email: req.body.email })
  console.log("mahi", details)
  if (details) {
    bcrypt.compare(req.body.password, details.password, (err, resp) => {
      console.log(err)
      if (err) {
        console.log('bycrypt error', err)
      }
      if (resp) {
        details.password = '';
        res.send({ message: 'Login successfull!', status: 'ok', data: details })
      }
      else {
        res.send({ message: 'Check your credentials!', status: 'error' })
      }

    })
  }
}, (err) => {
  console.log('Mongoose error!', err)
  res.send({ status: 'error', message: 'Mongoose error' })
}



exports.signup = async (req, res) => {
  if (true) {
    try {
      req.body['admin'] = 'false'
      req.body.password = await bcrypt.hash(req.body.password, 10);
      console.log(req.body);
      let user_data = await user.create(req.body)
      console.log(user_data, "ghjukj")
      user_data['password'] = '';
      res.send({ message: 'Created account successfully!', status: 'ok', data: user_data })
    } catch (error) {
      res.send({ status: 'error', message: 'Email/Name already exists!' })
    }
  }
  else {
    res.send({ status: 'error', message: 'Please check your otp' })
  }


}

exports.insertcard = async (req, res) => {
  try {
    await card.create(req.body)

    res.send({ status: 'ok', message: "Inserted data successfully!" })
  } catch (error) {
    res.send({ status: 'error', message: "Error inserting the data!" })
  }
}

exports.getcards = async (req, res) => {
  let data;
  try {
    data = await card.find({})

    res.send({ status: 'ok', message: "Fetched data successfully!", data: data })
  } catch (error) {
    res.send({ status: 'error', message: "Error inserting the data!" })
  }
}

exports.updatecart = async (req, res) => {
  let id = req['body']['user_id'];
  let type = req['body']['type'];
  let total_cart;
  let user = await cart.find({ user_id: id })
  try {
    if (user.length > 0) {
      let product_index = user[0]['products'].findIndex(product => {
        if (product['_id'] == req['body']['product']['_id']) {
          total_cart = type == 'add' ? product['cart'] + 1 : product['cart'] - 1;
        }
        return product['_id'] == req['body']['product']['_id'];
      })
      if (product_index >= 0 && total_cart > 0 && type != 'delete') {

        await cart.updateOne(
          { user_id: id, "products._id": req.body.product._id },
          { $set: { "products.$.cart": total_cart } },
          { upsert: true }
        )

      }
      else if (total_cart <= 0 || type == 'delete') {
        console.log('yee', total_cart, type)
        await cart.updateOne({ user_id: id, "products._id": req.body.product._id },
          {
            $pull: { products: { _id: req.body.product._id } }
          })
      }
      else {

        await cart.updateOne(
          { user_id: id },
          { $push: { products: req.body.product } }
        )
      }

    }
    else {
      let body_obj = {
        'user_id': id,
        'products': [req['body']['product']]
      }
      cart.create(body_obj)
    }
    res.send({ 'status': 'ok', message: 'Updated cart successful!' })
  }
  catch (error) {
    res.send({ 'status': 'error', message: error, })
  }
}

exports.getcart = async (req, res) => {
  let id = req.params.id;
  let cartProducts = await cart.find({ user_id: id })
  res.send({ 'status': 'ok', data: cartProducts });
}

exports.getorders = async (req, res) => {
  let id = req.params.id;
  let oredersProducts = await orders.find({ user_id: id }).populate('products.productId')
 console.log(oredersProducts);
  res.send({ 'status': 'ok', data: oredersProducts });
}

exports.paymentIntent = async (req, res) => {
  console.log("data product", req.body)
  stripe.paymentIntents.create({
    amount: parseInt(req.body.amount) * 100,
    currency: 'usd',
    payment_method_types: ["card"]
  },
    (err, paymentIntent) => {
      if (err) {
        res.status(500).json(err.message);
      }
      else {
        res.status(201).json(paymentIntent);
      }
    }
  )
}

exports.updateorders = async (req, res) => {
  let id = req['body']['user_id'];
  let products = req['body']['product'];
  let user = await orders.find({ user_id: id })
  try {

    if (user.length) {

      await orders.updateOne(
        { user_id: id },
        { $push: { products: products } }
      )
    }
    else {
      await orders.updateOne(
        { user_id: id },
        { $set: { "products": products } },
        { upsert: true }
      )
    }
    res.send({ 'status': 'ok', message: 'Updated cart successful!' })
  }
  catch (error) {
    res.send({ 'status': 'error', message: error, })
  }
}

exports.deleteCart = async (req, res) => {
  let user_id = req.body.id
  await cart.deleteOne({ user_id: user_id });
  res.status(200).json({ message: 'successfull' })
}