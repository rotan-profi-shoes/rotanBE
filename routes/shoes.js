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
        name: 'Stiefel',
    },
    {
        id: '2002',
        name: 'Stiefeletten',
    },
    {
        id: '2003',
        name: 'Halbstiefel',
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

const zertifikatTypes = [
    {
        id: '4001',
        name: 'Sicherheitsschuhe nach DIN EN ISO 20345:2011',
    },
    {
        id: '4002',
        name: 'Berufsschuhe nach DIN EN ISO 20347:2012',
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

const sizesTypes = ['32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

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
        name: 'Echtleder',
    },
    {
        id: '8002',
        name: 'Synthetik',
    },
    {
        id: '8003',
        name: 'Spaltleder',
    },
    {
        id: '8004',
        name: 'Andere',
    },
];

const soleTypes = [
    {
        id: '9001',
        name: '0',
    },
    {
        id: '9002',
        name: 'R',
    },
    {
        id: '9003',
        name: 'P',
    },
    {
        id: '9004',
        name: 'S',
    },
];

const upperLeatherTypes = [
    {
        id: '9101',
        name: 'Ökologisches Leder',
    },
    {
        id: '9102',
        name: 'Echtleder',
    },
    {
        id: '9103',
        name: 'Velur',
    },
    {
        id: '9104',
        name: 'Textil',
    },
];

const descriptionTypes = [
    {
        id: '9201',
        name: 'Hydrophobes Gewebe, verschleißfest',
    },
    {
        id: '9202',
        name: 'Spaltleder mit PU Beschichtung',
    },
];

const capDescriptionTypes = [
    {
        id: '9301',
        name: 'Thermo-beständig gegen 50 Joule zur Vermeidung von Unfällen',
    },
    {
        id: '9302',
        name: 'Metall - beständig gegen 200 Joule',
    },
];

const soleDescriptionTypes = [
    {
        id: '9401',
        name: 'Abnehmbares antistatisches antibakterielles Mittel aus Polyurethan mit Feuchtigkeitskontrollsystem und Stoßdämpfungssystem',
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
    const zertifikat = zertifikatTypes.find(zertifikat => zertifikat.id === req.body.zertifikat);
    const color = colorTypes.find(color => color.id === req.body.color);
    const modification = modificationTypes .find(modification => modification.id === req.body.modification);
    const material = materialTypes.find(material => material.id === req.body.material);
    const sole = soleTypes.find(sole => sole.id === req.body.sole);
    const upperLeather = upperLeatherTypes.find(upperLeather => upperLeather.id === req.body.upperLeather);
    const description = descriptionTypes.find(description => description.id === req.body.description);
    const capDescription = capDescriptionTypes.find(capDescription => capDescription.id === req.body.capDescription);
    const soleDescription = soleDescriptionTypes.find(soleDescription => soleDescription.id === req.body.soleDescription);

    const shoe = new Shoe({
        sku: req.body.sku.toUpperCase(),
        name: req.body.name,
        gender: gender,
        form: form, 
        shoesClass: shoesClass,
        zertifikat: zertifikat,
        color: color,
        modification: modification,
        material: material,
        sole: sole,
        description: description,
        upperLeather: upperLeather,
        capDescription: capDescription,
        soleDescription: soleDescription,
        img1: req.body.img1,
        img2: req.body.img2,
    });

    try {
        const savedShoe = await shoe.save();

        res.send({ _id: savedShoe._id });
    } catch(err) {
        res.status(400).send(err);
    };
});

router.put('/update-one/:id', verify, async (req, res) => {
    const UpdatableShoes = await Shoe.findOne({ _id: req.params.id });

    const gender = genderTypes.find(gender => gender.id === req.body.gender);
    const form = formTypes.find(form => form.id === req.body.form);
    const shoesClass = shoesClassTypes.find(shoesClass => shoesClass.id === req.body.shoesClass);
    const zertifikat = zertifikatTypes.find(zertifikat => zertifikat.id === req.body.zertifikat);
    const color = colorTypes.find(color => color.id === req.body.color);
    const modification = modificationTypes .find(modification => modification.id === req.body.modification);
    const material = materialTypes.find(material => material.id === req.body.material);
    const sole = soleTypes.find(sole => sole.id === req.body.sole);
    const upperLeather = upperLeatherTypes.find(upperLeather => upperLeather.id === req.body.upperLeather);
    const description = descriptionTypes.find(description => description.id === req.body.description);
    const capDescription = capDescriptionTypes.find(capDescription => capDescription.id === req.body.capDescription);
    const soleDescription = soleDescriptionTypes.find(soleDescription => soleDescription.id === req.body.soleDescription);

    const updatedShoes = await Shoe.findOneAndUpdate({ _id: UpdatableShoes._id.valueOf() }, {
        name: req.body.name,
        gender: gender,
        form: form, 
        shoesClass: shoesClass,
        zertifikat: zertifikat,
        color: color,
        modification: modification,
        material: material,
        sole: sole,
        description: description,
        upperLeather: upperLeather,
        capDescription: capDescription,
        soleDescription: soleDescription,
        img1: req.body.img1,
        img2: req.body.img2,
    });

    res.send({ updatedShoes });
})

router.get('/', verify, async (req, res) => {
    const shoes = await Shoe.find();

    try {
        res.send(shoes);
    } catch(err) {
        res.status(400).send(err);
    }    
});

router.get('/find/:id', verify, async (req, res) => {
    const shoes = await Shoe.findOne({ _id: req.params.id });

    try {
        res.send(shoes);
    } catch(err) {
        res.status(400).send(err);
    }    
});

router.delete('/:id', verify, async (req, res) => {
    const shoes = await Shoe.findByIdAndDelete({ _id: req.params.id });

    try {
        res.send(shoes);
    } catch(err) {
        res.status(400).send(err);
    }
});

router.get('/gender-types', verify, async (req, res) => {
    res.send(genderTypes);
});

router.get('/form-types', verify, async (req, res) => {
    res.send(formTypes);
});

router.get('/shoes-class-types', verify, async (req, res) => {
    res.send(shoesClassTypes);
});

router.get('/zertifikat-types', verify, async (req, res) => {
    res.send(zertifikatTypes);
});

router.get('/color-types', verify, async (req, res) => {
    res.send(colorTypes);
});

router.get('/sizes-types', verify, async (req, res) => {
    res.send(sizesTypes);
});

router.get('/modification-types', verify, async (req, res) => {
    res.send(modificationTypes);
});

router.get('/material-types', verify, async (req, res) => {
    res.send(materialTypes);
});

router.get('/sole-types', verify, async (req, res) => {
    res.send(soleTypes);
});

router.get('/upper-leather-types', verify, async (req, res) => {
    res.send(upperLeatherTypes);
});

router.get('/description-types', verify, async (req, res) => {
    res.send(descriptionTypes);
});

router.get('/cap-description-types', verify, async (req, res) => {
    res.send(capDescriptionTypes);
});

router.get('/sole-description-types', verify, async (req, res) => {
    res.send(soleDescriptionTypes);
});

module.exports = router;