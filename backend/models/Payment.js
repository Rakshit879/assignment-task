const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  product: String,
  amount: Number,
  userEmail: String,
  date: {
    type: Date,
    default: Date.now,
  },
});
 
module.exports = mongoose.model('Payment', paymentSchema);
