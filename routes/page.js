const express = require('express');

const router = express.Router();

const course = require('../models/course.model')


router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

// router.get('/login_admin', (req, res) => {
//     res.render('login_admin');
// });
router.get('/register_admin', (req, res) => {
    res.render('register_admin');
});


module.exports = router;