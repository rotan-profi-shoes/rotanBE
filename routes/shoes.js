const router = require('express').Router();
const { shoeValidation } = require('../validation');
const verify = require('./verifyToken');
const Shoe = require('../model/Shoe');
const Size = require('../model/Size');
const ParentSku = require('../model/ParentSku');

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

const sizesTypes = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48'];

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

const shoesTypes = [
  {
    id: '9501',
    name: 'Medical',
  },
  {
    id: '9502',
    name: 'Work',
  },
  {
    id: '9503',
    name: 'Safety',
  },
  {
    id: '9504',
    name: 'Accessories',
  },
];

router.post('/add', verify, async (req, res) => {
  const {error} = shoeValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if sku number is not taken already
  const existsSku = await Shoe.findOne({sku: req.body.sku});
  if (existsSku) return res.status(400).send('The SKU number is already taken');

  const parentSku = await ParentSku.findOne({parentSku: req.body.parentSku});

  const gender = genderTypes.find(gender => gender.id === req.body.gender);
  const form = formTypes.find(form => form.id === req.body.form);
  const shoesClass = shoesClassTypes.find(shoesClass => shoesClass.id === req.body.shoesClass);
  const zertifikat = zertifikatTypes.find(zertifikat => zertifikat.id === req.body.zertifikat);
  const color = colorTypes.find(color => color.id === req.body.color);
  const modification = modificationTypes.find(modification => modification.id === req.body.modification);
  const material = materialTypes.find(material => material.id === req.body.material);
  const sole = soleTypes.find(sole => sole.id === req.body.sole);
  const upperLeather = upperLeatherTypes.find(upperLeather => upperLeather.id === req.body.upperLeather);
  const description = descriptionTypes.find(description => description.id === req.body.description);
  const capDescription = capDescriptionTypes.find(capDescription => capDescription.id === req.body.capDescription);
  const soleDescription = soleDescriptionTypes.find(soleDescription => soleDescription.id === req.body.soleDescription);

  const shoe = new Shoe({
    parentSku: parentSku,
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
    shoesType: req.body.shoesType,
    photos: req.body.photos,
  });

  try {
    const savedShoe = await shoe.save();

    res.send({_id: savedShoe._id});
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put('/update-one/:id', verify, async (req, res) => {
  const UpdatableShoes = await Shoe.findOne({_id: req.params.id});

  const parentSku = await ParentSku.findOne({parentSku: req.body.parentSku});

  const gender = genderTypes.find(gender => gender.id === req.body.gender);
  const form = formTypes.find(form => form.id === req.body.form);
  const shoesClass = shoesClassTypes.find(shoesClass => shoesClass.id === req.body.shoesClass);
  const zertifikat = zertifikatTypes.find(zertifikat => zertifikat.id === req.body.zertifikat);
  const color = colorTypes.find(color => color.id === req.body.color);
  const modification = modificationTypes.find(modification => modification.id === req.body.modification);
  const material = materialTypes.find(material => material.id === req.body.material);
  const sole = soleTypes.find(sole => sole.id === req.body.sole);
  const upperLeather = upperLeatherTypes.find(upperLeather => upperLeather.id === req.body.upperLeather);
  const description = descriptionTypes.find(description => description.id === req.body.description);
  const capDescription = capDescriptionTypes.find(capDescription => capDescription.id === req.body.capDescription);
  const soleDescription = soleDescriptionTypes.find(soleDescription => soleDescription.id === req.body.soleDescription);

  const updatedShoes = await Shoe.findOneAndUpdate({_id: UpdatableShoes._id.valueOf()}, {
    parentSku: parentSku,
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
    shoesType: req.body.shoesType,
    photos: req.body.photos,
  }, {
    new: true,
  });

  res.send({updatedShoes});
})

router.get('/', async (req, res) => {
  let filters = {};

  if (req.query?.shoesType) {
    filters['shoesType.id'] = req.query.shoesType;
  }

  if (req.query?.gender) {
    filters['gender.id'] = req.query.gender;
  }

  if (req.query?.color) {
    filters['color.id'] = req.query.color;
  }

  let shoes = await Shoe.find({
    ...filters,
  }).lean();

  shoes = await Promise.all(shoes.map(async (shoe) => {
    return {
      ...shoe,
      additionalData: {
        sizes: await Size.find({ shoesId: shoe._id }),
        similarModels: await Shoe.find({ parentSku: shoe.parentSku }),
      }
    }

  }));

  try {
    res.send(shoes);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/copy/:id', verify, async (req, res) => {
  const skuToCopy = await Shoe.findOne({ _id: req.params.id });

  const existsSku = await Shoe.findOne({ sku: req.body.sku });
  if (existsSku) return res.status(400).send('The SKU number is already taken');

  const shoe = new Shoe({
      parentSku: skuToCopy.parentSku,
      sku: req.body.sku.toUpperCase(),
      name: skuToCopy.name,
      gender: skuToCopy.gender,
      form: skuToCopy.form,
      shoesClass: skuToCopy.shoesClass,
      zertifikat: skuToCopy.zertifikat,
      color: skuToCopy.color,
      modification: skuToCopy.modification,
      material: skuToCopy.material,
      sole: skuToCopy.sole,
      description: skuToCopy.description,
      upperLeather: skuToCopy.upperLeather,
      capDescription: skuToCopy.capDescription,
      soleDescription: skuToCopy.soleDescription,
  });

  try {
    const savedShoe = await shoe.save();

    res.send({_id: savedShoe._id});
  } catch (err) {
    res.status(400).send(err);
  };
})

router.get('/grouped', verify, async (req, res) => {
  const parentSku = await ParentSku.find();
  const shoes = await Shoe.find();

  const shoesGroupedBySku = parentSku.reduce((acc, curr) => {
    acc[curr.parentSku] = [];   

    return acc;
  }, {});


  for (const shoe of shoes) {
    shoesGroupedBySku[shoe.parentSku?.parentSku]?.push(shoe);
  }

  const returnableArray = [];

  Object.keys(shoesGroupedBySku).map((sku) => {

    returnableArray.push({
      name: sku,
      shoes: shoesGroupedBySku[sku],
    });
  })

  try {
    res.send(returnableArray);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/find/:id', async (req, res) => {
  const shoes = await Shoe.findOne({_id: req.params.id});

  try {
    res.send(shoes);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/:id', verify, async (req, res) => {
  const shoes = await Shoe.findByIdAndDelete({_id: req.params.id});

  try {
    res.send(shoes);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/gender-types', async (req, res) => {
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

router.get('/color-types', async (req, res) => {
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

router.get('/shoes-types', async (req, res) => {
  res.send(shoesTypes);
});

module.exports = router;
