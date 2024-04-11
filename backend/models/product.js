'use strict';

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    owner: String,
    price: String,
});

export const Product = mongoose.model('Product', productSchema);
