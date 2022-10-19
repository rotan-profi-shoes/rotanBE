const router = require('express').Router();
const {orderValidation} = require('../validation');
const verify = require('./verifyToken');
const Order = require('../model/Order');
const Joi = require("@hapi/joi");

router.post('/create', async (req, res) => {
  const {error} = orderValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const order = new Order({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    addressLine: req.body.addressLine,
    postalCode: req.body.postalCode,
    city: req.body.city,
    country: req.body.country,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    deliveryMethod: req.body.deliveryMethod,
    paymentMethod: req.body.paymentMethod,
    products: req.body.products,
    priceForProducts: req.body.priceForProducts,
    deliveryPrice: req.body.deliveryPrice,
    totalPriceForProducts: req.body.totalPriceForProducts,
  });

  try {
    const savedOrder = await order.save();

    res.send({
      _id: savedOrder._id,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
