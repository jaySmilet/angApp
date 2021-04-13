var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/eshop",{useNewUrlParser:true,useUnifiedTopology:true});
var con =mongoose.connection;

var userSchema=new mongoose.Schema({
    name:String,
    email:String,
    username:String,
    password:String
});

var userModel=mongoose.model("User",userSchema);
module.exports=userModel;