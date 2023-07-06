const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const saltRounds = 10;

const User = require("../models/User.model");

const {isLoggedIn, isLoggedOut} = require('../middleware/route-guard')


router.get("/signUp", isLoggedOut, (req, res)=>{
    console.log("Hi");
    res.render("auth/signup");
});

router.post("/signUp", (req, res) =>{
    console.log(req.body)
  const { username, email, password } = req.body; 
  
  if(username === "" || email === "" || password === "") {
    res.status(400).render("auth/signUp", {
        errorMessage:
        "All fields are mandatory. Please provide your username, email and password.",
    });

    return;
  }

  if (password.length <6) {
    res.status(400).render("auth/signUp", {
        errorMessage: "Your password needs to be at least 6 characters long.",
    });

    return;
  }

  bcrypt
   .genSalt(saltRounds)
   .then((salt) => bcrypt.hash(password, salt))
   .then((hashedPassword) =>{
    return User.create({ username, email, password: hashedPassword });
   })
   .then((user) => {
    res.redirect("/login");
   })
   .catch((error) =>{
    if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signUp", {errorMessage: error.message });
    } else if (error.code === 11000) {
        res.status(500).render("auth/signUp", {
            errorMessage:
            "Username and email need to be unique. Provide a valid username or email.",
        });
    } else {
        next(error);
    }
   });

});


// auth/login

router.get("/login", isLoggedOut, (req, res) =>{
    res.render("auth/login");
});

router.get('/userProfile', isLoggedIn, (req, res) => {
    res.render('userProfile', { userInSession: req.session.currentUser})
    
});
router.post("/login", isLoggedOut, (req, res, next) => {
    const { username, email, password } = req.body;

    if (username === "" || email === "" || password === "") {
        res.status(400).render("auth/login", {
            errorMessage: "All fields are mandatory. Please provide username, email and password.",
        });

        return;
    }

    if (password.length <6) {
        return res.status(400).render("auth/login", {
            errorMessage: "Your password needs to be at least 6 characters long.",
        });
    }
    console.log('SESSION =====>', req.session);

    User.findOne({ email})
    .then((user) =>{
        if(!user) {
            res
            .status(400)
            .render("auth/login", { errorMessage: "Wrong credentials."});
            return;
        } else if (bcrypt.compareSync(password, user.password)) {
            req.session.currentUser = user;
            res.render('userProfile', { user });
   
        } else {
            res.render('login', {errorMessage: 'Incorrect password.'});
        }

    })
    .catch(error => next(error));


        // bcrypt
        // .compare(password, user.password)
        // .then((isSamePassword) =>{
        //     if (!isSamePassword) {
        //         res
        //         .status(400)
        //         .render("auth/login", {errorMessage: "Wrong credentials."});
        //         return;
        //     }

        //     req.session.currentUser = user.toObject();
        //     delete req.session.currentUser.password;

        //     res.redirect("/");
        // })
        // .catch((err) => next(err));
    });

router.get("/logout", isLoggedIn, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).render("auth/logout", {errorMessage: err.message});
            return;
        }

        res.redirect("/");
    });
});
router.post('/logout', (req, res, next) =>{
    req.session.destroy(err =>{
        if (err) next(err);
        res.redirect('/');
    });
});

module.exports = router;
