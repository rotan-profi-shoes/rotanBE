const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  addressLine: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  deliveryMethod: {
    type: {},
    required: true,
  },
  paymentMethod: {
    type: {},
    required: true,
  },
  products: {
    type: [],
    required: true,
  },
  priceForProducts: {
    type: String,
    required: true,
  },
  deliveryPrice: {
    type: String,
    required: true,
  },
  totalPriceForProducts: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);
