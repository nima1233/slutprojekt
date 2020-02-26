const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


app.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

app.get('/forum', ensureAuthenticated, (req, res) => 
    res.render('forum', {
        user: req.user
    })
);

module.exports = router;