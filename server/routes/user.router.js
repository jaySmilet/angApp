const express = require("express");
const router = express.Router();
require('dotenv').config();
var user = require("../models/user.model");
var checkAuth = require("../middleware/check-auth");

router.get('/username', checkAuth, (req, res, next) => {
    res.status(200).json({message:'successfully got userdata',username:req.userData.username})
})

module.exports = router;