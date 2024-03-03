const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const {isAuthenticatedAdmin} = require('../middlware/authentication');

router.get('', isAuthenticatedAdmin, async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const products = await Product.find();

        res.render('adminCarousel', { products: products, lang: lang });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;