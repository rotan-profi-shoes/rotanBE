const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    shoesId: {
        type: String,
        required: true,
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
