const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
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
    protectionClass: {
        type: {},
        required: true,
    },
    color: {
        type: {},
        required: true,
    },
    size: {
        type: {},
        required: true,
    },
    price: {
        type: Number,
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
});

module.exports = mongoose.model('Shoe', shoeSchema);