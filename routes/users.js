const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/Users');
const { forwardAuthenticated } = require('../config/auth');

router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

router.post('/register', (req, res) => {
    const { name, password } = req.body;
    let errors = [];

    if (!name || !password || !dob || !gender) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            password,
            dob,
            gender
        });
    } else {
        name.findOne({ name: name }).then(user => {
            if (user) {
                errors.push({ msg: 'Name already exists' });
                res.render('register', {
                    errors,
                    name,
                    password,
                    dob,
                    gender
                });
            } else {
                const newUser = new User({
                    name,
                    password,
                    dob,
                    gender
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                          .save()
                          .then(user => {
                              req.flash(
                                  'success_msg',
                                  'You are now registered and can log in'
                              );
                              res.redirect('/login');
                          })
                          .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/forum',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});

module.exports = router;