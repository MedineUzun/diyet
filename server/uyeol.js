const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('./mongo'); 

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/form.html'));
});

router.post('/', (req, res) => {
    const { firstName, lastName, phone, email, password, isDietitian } = req.body;

    const newUser = new User({
        firstName,
        lastName,
        phone,
        email,
        password,
        isDietitian: isDietitian === 'yes'
    });

    newUser.save()
        .then(() => res.redirect('/signIn.html'))
        .catch(err => res.status(500).send('Kullanıcı kaydedilirken bir hata oluştu.'));
});

module.exports = router;
