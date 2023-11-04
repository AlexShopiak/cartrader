'use strict';

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    owner: String,
    price: String,
});

module.exports = mongoose.model('Product', productSchema);
