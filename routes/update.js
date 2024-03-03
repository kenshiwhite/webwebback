const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {isAuthenticatedAdmin} = require('../middlware/authentication');
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.get('', isAuthenticatedAdmin, async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const users = await User.find();

        res.render('../views/update.ejs', { users: users, lang: lang });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const lang = req.query.lang || 'en';
    const id = req.body.id;
    const username = req.body.username;
    const password = req.body.password;
    const creationDate = req.body.createD;
    const deleteDate = req.body.deleteD;
    const isAdmin = req.body.isAdmin === 'on';

    
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const filter = { _id: id };
    const update = {
        username: username,
        password: hashedPassword,
        creationDate: creationDate,
        updateDate: new Date(),
        deleteDate: deleteDate,
        isAdmin: isAdmin
    };

    try {
        const result = await User.updateOne(filter, update);
        console.log('Update result:', result);
        res.redirect(`update?lang=${lang}`);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;