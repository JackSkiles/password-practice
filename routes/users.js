
const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
    res.render('users.ejs');
});

router.post('/', (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        db.User.create({
            username,
            email,
            password: hash
        }).then(res.redirect('/users'));
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.User.findOne({ where: { username }})
        .then(User => {
            bcrypt.compare(password, User.password, (err, match) => {
                if (match) {
                    res.send('Logged in!');
                } else {
                    res.send('Inccorect password.')
                }
            })
        })
        .catch(() => {
            res.send('username not found');
        });
});
module.exports = router;
