const router = require('express').Router();
const { sizeValidation } = require('../validation');
const verify = require('./verifyToken');
const Size = require('../model/Size');

router.post('/add', verify, async (req, res) => {
    try {
        const savedSisez = await Size.insertMany(req.body);

        res.send({ savedSisez });
    } catch(err) {
        res.status(400).send(err);
    }
});

router.get('/:id', verify, async (req, res) => {
    const sizes = await Size.find({ _id: req.params.id });

    try {
        res.send(sizes);
    } catch(err) {
        res.status(400).send(err);
    }    
});

router.delete('/:sku', verify, async (req, res) => {
    const sizes = await Size.deleteMany({ sku: req.params.sku });

    try {
        res.send(sizes);
    } catch(err) {
        res.status(400).send(err);
    }    
})

module.exports = router;