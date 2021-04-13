var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/eshop", { useNewUrlParser: true, useUnifiedTopology: true });
var con = mongoose.connection;

var productSchema = new mongoose.Schema({
    product_name: {type:String,required: true},
    product_price: {type:Number,required: true}, 
    product_color: {type:String,required: true},
    product_quantity: {type:Number,required: true},
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

var productModel = mongoose.model("Product", productSchema);
module.exports = productModel;