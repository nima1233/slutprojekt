const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get('/forum', ensureAuthenticated, (req, res) => 
    res.render('forum', {
        user: req.user
    })
);

module.exports = router;