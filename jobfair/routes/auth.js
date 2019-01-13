var express = require("express");
var router = express.Router();


const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.use((req, res, next) => {
    console.log("PROVERA");
    let token = req.headers['auth'];
    if (!token) {
        res.json({ success: false, message: "No token provided" });
    } else {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.json({ success: false, message: "Token invalid: " + err });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
});

module.exports = router;