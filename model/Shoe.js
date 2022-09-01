const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
    parentSku: {
        type: {},
        required: true,
    },
    sku: {
        type: String,
        required: true,
        min: 6,
    },
    name: {
        type: String,
        required: true,
        min: 6,
    },
    gender: {
        type: {},
        required: true,
    },
    form: {
        type: {},
        required: true,
    },
    shoesClass: {
        type: {},
        required: true,
    },
    zertifikat: {
        type: {},
        required: true,
    },
    color: {
        type: {},
        required: true,
    },
    modification: {
        type: {},
        required: true,
    },
    material: {
        type: {},
        required: true,
    },
    sole: {
        type: {},
        required: true,
    },
    upperLeather: {
        type: {},
        required: true,
    },
    description: {
        type: {},
        required: true,
    },
    capDescription: {
        type: {},
        required: true,
    },
    soleDescription: {
        type: {},
        required: true,
    },
    photos: {
        type: [],
        required: true,
    },
    shoesType: {
        type: [],
        required: true,
    },
});

module.exports = mongoose.model('Shoe', shoeSchema);
