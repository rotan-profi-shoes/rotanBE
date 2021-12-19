const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: true,
        min: 3,
    },
    sizeValue: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Size', sizeSchema);