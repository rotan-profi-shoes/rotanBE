const router = require('express').Router();
const verify = require('./verifyToken');
const Size = require('../model/Size');

router.post('/add', verify, async (req, res) => {
  try {
    const savedSisez = await Size.insertMany(req.body);

    res.send({savedSisez});
  } catch (err) {
    res.status(400).send(err);
  }
});


router.post('/add-one', verify, async (req, res) => {
  const size = new Size({
    shoesId: req.body.shoesId,
    sizeValue: req.body.sizeValue,
    quantity: req.body.quantity,
    price: req.body.price,
  })
  try {
    const savedSize = await size.save();

    res.send({savedSize});
  } catch (err) {
    res.status(400).send(err);
  }
});


router.put('/update-one/:id', verify, async (req, res) => {
  const UpdatableSize = await Size.findOne({_id: req.params.id});

  const updatedSize = await Size.findOneAndUpdate({_id: UpdatableSize._id.valueOf()}, {
    sizeValue: req.body.sizeValue,
    quantity: req.body.quantity,
    price: req.body.price,
  });

  res.send({updatedSize});
});

router.get('/:id', verify, async (req, res) => {
  const sizes = await Size.find({shoesId: req.params.id});

  try {
    res.send(sizes);
  } catch (err) {
    res.status(400).send(err);
  }
});


router.get('/find-one/:id', verify, async (req, res) => {
  const size = await Size.findOne({_id: req.params.id});

  try {
    res.send(size);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/:sku', verify, async (req, res) => {
  const sizes = await Size.deleteMany({sku: req.params.sku});

  try {
    res.send(sizes);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/delete-one/:id', verify, async (req, res) => {
  const size = await Size.findOneAndDelete({_id: req.params.id});

  try {
    res.send(size);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
