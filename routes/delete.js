const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {isAuthenticatedAdmin} = require('../middlware/authentication');


router.get('', isAuthenticatedAdmin, async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const users = await User.find();

        res.render('../views/delete.ejs', { users: users, lang: lang });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const lang = req.query.lang || 'en';
    const id = req.body.id;
    console.log(id);

    const filter = { _id: id };
    const update = {
        deletionDate: new Date()
    };
    console.log(filter, update);

    try {
        const result = await User.updateOne(filter, update);
        console.log('Delete result:', result);
        res.redirect(`delete?lang=${lang}`);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;