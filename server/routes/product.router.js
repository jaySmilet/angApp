const express = require("express");
const router = express.Router();
require('dotenv').config();
var product = require("../models/product.model");
var checkAuth = require("../middleware/check-auth");

router.get("/", checkAuth, (req, res, next) => {
    product.find({ creator: req.userData.userId })
        .then(products => {
            res.status(200).json({ message: "Product fetched successfully", products: products })
        })
        .catch(err => {
            res.status(500).json({ message: "Product could not fetched!" })
        })
})

router.get("/:id", checkAuth, (req, res, next) => {
    product.findById({ _id: req.params.id, creator: req.userData.userId })
        .then(product => {
            if (product) {
                res.status(200).json({ message: "Product fetched successfully", products: product })
            } else {
                res.status(401).json({ message: "Product not found!", products: product })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Product could not fetched!" })
        })
})


router.post("/add", checkAuth, (req, res, next) => {
    var productData = new product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_color: req.body.product_color,
        product_quantity: req.body.product_quantity,
        creator: req.userData.userId
    });
    console.log(req.body)
    productData.save()
        .then(prodDetails => {
            res.status(201).json({ message: "Product Added", prodDetails: prodDetails })
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong", err: err })
        })
})

router.put("/:id", checkAuth, (req, res, next) => {
    product.updateOne({ _id: req.params.id, creator: req.userData.userId }, {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_color: req.body.product_color,
        product_quantity: req.body.product_quantity
    }).exec()
        .then(product => {
            if (product.nModified > 0) {
                res.status(200).json({ message: "Product updated successfully", products: product })
            } else {
                res.status(401).json({ message: "Unauthorized!", products: product })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Product could not updated!", err: err })
        })
})

router.delete("/:id", checkAuth, (req, res, next) => {
    product.deleteOne({ _id: req.params.id, creator: req.userData.userId }).exec()
        .then(product => {
            console.log(product)
            if (product.n > 0) {
                res.status(200).json({ message: "Product deleted successfully" })
            } else {
                res.status(401).json({ message: "Unauthorized!" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Product could not deleted!", err: err })
        })
})

module.exports = router;