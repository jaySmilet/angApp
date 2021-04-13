const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decodedToken)
        req.userData = { username: decodedToken.username, userId: decodedToken.userId }
        next()
    } catch (error) {
        res.status(401).json({ message: "You Are Not Authenticated!", error: error });
    }
}