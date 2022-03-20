const mongoose = require('mongoose');

const parentSkuSchema = new mongoose.Schema({
  parentSku: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('ParentSku', parentSkuSchema);
