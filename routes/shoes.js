const router = require('express').Router();
const { shoeValidation } = require('../validation');
const verify = require('./verifyToken');
const Shoe = require('../model/Shoe');

const genderTypes = [
    {
        id: '1001',
        name: 'Weiblich',
    },
    {
        id: '1002',
        name: 'Männlich',
    },
    {
        id: '1003',
        name: 'Unisex',
    },
];

const formTypes = [
    {
        id: '2001',
        name: 'Sapogi',
    },
    {
        id: '2002',
        name: 'Botinki',
    },
    {
        id: '2003',
        name: 'Polu botinki',
    },
    {
        id: '2004',
        name: 'Sneaker',
    },
    {
        id: '2005',
        name: 'Clogs',
    },
    {
        id: '2006',
        name: 'Sandalen',
    },
];

const shoesClassTypes = [
    {
        id: '3001',
        name: 'OB',
    },
    {
        id: '3002',
        name: 'O1', 
    },
    {
        id: '3003',
        name: 'O2', 
    },
    {
        id: '3004',
        name: 'SB', 
    },
    {
        id: '3005',
        name: 'S1', 
    },
    {
        id: '3006',
        name: 'S2', 
    },
    {
        id: '3007',
        name: 'S3', 
    },
];

const protectionClassTypes = [
    {
        id: '4001',
        name: 'Berufsschuhe',
    },
    {
        id: '4002',
        name: 'Sicherhetsschuhe',
    },
];

const colorTypes = [
    {
        id: '5001',
        name: 'Weiß',
    },
    {
        id: '5002',
        name: 'Schwarz',
    },
    {
        id: '5003',
        name: 'Braun',
    },
    {
        id: '5004',
        name: 'Grau',
    },
    {
        id: '5005',
        name: 'Mehrfarbig',
    },
];

const sizesTypes = [
    {
        id: '6001',
        name: '36',
    },
    {
        id: '6002',
        name: '37',
    },
    {
        id: '6003',
        name: '38',
    },
    {
        id: '6004',
        name: '39',
    },
    {
        id: '6005',
        name: '40',
    },
    {
        id: '6006',
        name: '41',
    },
    {
        id: '6007',
        name: '42',
    },
    {
        id: '6008',
        name: '43',
    },
    {
        id: '6009',
        name: '44',
    },
    {
        id: '6010',
        name: '45',
    },
    {
        id: '6011',
        name: '46',
    },
    {
        id: '6012',
        name: '47',
    },
    {
        id: '6013',
        name: '48',
    },
    {
        id: '6014',
        name: '49',
    },
    {
        id: '6015',
        name: '50',
    },
    {
        id: '6016',
        name: '51',
    },
    {
        id: '6017',
        name: '52',
    },
];

const modificationTypes = [
    {
        id: '7001',
        name: 'Antistatik',
    },
    {
        id: '7002',
        name: 'Esd',
    },
    {
        id: '7003',
        name: 'Kevlar',
    },
    {
        id: '7004',
        name: 'Metall',
    },
    {
        id: '7005',
        name: 'Thermo',
    },
];

const materialTypes = [
    {
        id: '8001',
        name: 'Naturalnaia koja',
    },
    {
        id: '8002',
        name: 'SIntetika',
    },
    {
        id: '8003',
        name: 'Drogoe',
    },
];

const soleTypes = [
    {
        id: '9001',
        name: '0 (Nulevaia)',
    },
    {
        id: '9002',
        name: 'R (Ruminskaea)',
    },
    {
        id: '9003',
        name: 'P (Polskaea)',
    },
    {
        id: '9004',
        name: 'S (Skeater)',
    },
];

router.post('/add', verify, async (req, res) => {
    const { error } = shoeValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if sku number is not taken already
    const existsSku = await Shoe.findOne({ sku: req.body.sku });
    if (existsSku) return res.status(400).send('The SKU number is already taken');

    const gender = genderTypes.find(gender => gender.id === req.body.gender);
    const form = formTypes.find(form => form.id === req.body.form);
    const shoesClass = shoesClassTypes.find(shoesClass => shoesClass.id === req.body.shoesClass);
    const protectionClass = protectionClassTypes.find(protectionClass => protectionClass.id === req.body.protectionClass);
    const color = colorTypes.find(color => color.id === req.body.color);
    const modification = modificationTypes .find(modification => modification.id === req.body.modification);
    const material = materialTypes.find(material => material.id === req.body.material);
    const sole = soleTypes.find(sole => sole.id === req.body.sole);

    const shoe = new Shoe({
        sku: req.body.sku,
        name: req.body.name,
        gender: gender,
        form: form, 
        shoesClass: shoesClass,
        protectionClass: protectionClass,
        color: color,
        size: req.body.size,
        price: req.body.price,
        modification: modification,
        material: material,
        sole: sole,
    });

    try {
        const savedShoe = await shoe.save();
        res.send({ sku: savedShoe.sku });
    } catch(err) {
        res.status(400).send(err);
    };
});

module.exports = router;