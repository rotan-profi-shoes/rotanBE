const router = require('express').Router();
const verify = require('./verifyToken');
const ParentSku = require('../model/ParentSku');

router.post('/add', verify, async (req, res) => {
  const parentSku = new ParentSku({
    parentSku: req.body.parentSku,
  });

  // Checking if sku number is not taken already
  const existsSku = await ParentSku.findOne({ parentSku: req.body.parentSku });
  if (existsSku) return res.status(400).send(`The PARENT SKU ${req.body.parentSku} is already taken`);

  try {
    const savedParentSku = await parentSku.save();

    res.send({ savedParentSku });
  } catch(err) {
    res.status(400).send(err);
  }
});

router.get('/', verify, async (req, res) => {
  const sku = await ParentSku.find();

  try {
    res.send(sku.reverse());
  } catch(err) {
    res.status(400).send(err);
  }
});

router.delete('/:id', verify, async (req, res) => {
  const sku = await ParentSku.findByIdAndDelete({ _id: req.params.id });

  try {
    res.send(sku);
  } catch(err) {
    res.status(400).send(err);
  }
});

module.exports = router;
