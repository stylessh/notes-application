const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/user/login', (req, res)=> {
    res.render('users/login')
});

router.post('/user/login', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/user/login',
    failureFlash: true
}));







router.get('/user/register', (req, res)=> {
    res.render('users/register')
});

router.post('/user/register', async (req, res)=> {
    const {name, email, password, confirm_password} = req.body;
    const errors = [];

    if(name.length <= 0) {
        errors.push({text: 'Please Insert Your Name'});
    }

    if(email.length <= 0) {
        errors.push({text: 'Please Insert Your Email'});
    }

    if(password != confirm_password) {
        errors.push({text: 'Password do not match'})
    }

    if (password.length < 4) {
        errors.push({text: 'The password must be at least 4 characters'})
    }

    if(errors.length > 0) {
        res.render('users/register', {
            errors,
            name, 
            email, 
            password,
            confirm_password
        })
    } else {
        const emailUser = await User.findOne({email: email});
        const newUser = new User({name, email, password});
        
        if (emailUser) {
            req.flash('error_msg', 'The email has been taken');
            res.redirect('/user/register');
        }

        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();

        req.flash('success_msg', 'Successfully Registered!');
        res.redirect('/user/login');
    } 
});

router.get('/user/logout', (req, res)=> {
    req.logOut();
    req.flash('success_msg', 'Successfully Logout!')
    res.redirect('/');
});

module.exports = router;