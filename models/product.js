const mongoose = require('mongoose');

const product = new mongoose.Schema({
    url1: String,
    url2: String,
    url3: String,
    name: String,
    description: String,
    creationDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: null },
    deletionDate: { type: Date, default: null },
});


const Product = mongoose.model('Products', product);

module.exports = Product;