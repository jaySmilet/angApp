require('dotenv').config();
const express = require('express');
const bodyParser=require("body-parser");
const cors=require("cors");
const app = express();

//parse json/application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Router
const indexRouter = require("./routes/index.router");
const productRouter = require("./routes/product.router");
const userRouter = require("./routes/user.router");
const { json } = require('body-parser');

// cors
app.use(cors());

app.use("/", indexRouter);
app.use("/products", productRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})