const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
var user = require("../models/user.model");

router.get("/", (req, res, next) => {
    res.send("hi bhaiya g");
})

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            var userData = new user({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: hash
            });
            userData.save().
                then(result => {
                    res.status(201).json({ message: "User Created", result: result })
                })
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong", err: err })
        })
})

router.post("/signin", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    user.findOne({ username: username })
        .then(data => {
            console.log(data)
            if (!data) {
                return res.status(401).json({ message: "Username not found!" })
            }
            bcrypt.compare(password, data.password, (err, result) => {
                if (err) {
                    return res.status(401).json({ err: err, message: "Auth Failed" })
                }
                if (result) {
                    const payload = { username: data.username, userId: data._id };
                    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "30m" });
                    return res.status(200).json({ message: "Auth Successfull", token: token, expiresIn: "30m" });
                }
                res.status(401).json({message: 'password is incorrect!'})
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({ err: err })
        })
})

module.exports = router;