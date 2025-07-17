const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const nodemailer = require('nodemailer');
 
// Email Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Create Stripe session
router.post('/create-checkout-session', async (req, res) => {
  const { product, price, email } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'inr',
        product_data: { name: product },
        unit_amount: price * 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/',
    customer_email: email,
  });

  // Save payment
  const newPayment = new Payment({ product, amount: price, userEmail: email });
  await newPayment.save();

  // Send Email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Payment Notification',
    text: `User ${email} purchased ${product} for ₹${price}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
  });

  res.json({ id: session.id });
});

// Admin: Get all payments
router.get('/all', async (req, res) => {
  const payments = await Payment.find().sort({ date: -1 });
  res.json(payments);
});

module.exports = router;
