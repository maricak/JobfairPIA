var express = require("express");
var router = express.Router();

var Company = require('../models/company');
var Opening = require('../models/opening');


const jwt = require('jsonwebtoken');
const config = require('../config/database');

// router.use((req, res, next) => {
//     console.log("student PROVERA");
//     let token = req.headers['auth'];
//     if (!token) {
//         res.json({ success: false, message: "No token provided" });
//     } else {
//         jwt.verify(token, config.secret, (err, decoded) => {
//             if (err) {
//                 res.json({ success: false, message: "Token invalid: " + err });
//             } else {
//                 req.decoded = decoded;
//                 next();
//             }
//         })
//     }
// });

router.get('/info/:id', (req, res) => {
    let id = req.params.id;
    // if (req.decoded.type != "student") {
    //     res.json({ success: false, message: "This data is only for students" });
    // } else if (id !== req.decoded.id) {
    //     res.json({ success: false, message: "Access to others student's data is not allowed" })
    // } else {
    Opening.findById(id, (err, opening) => {
        if (err) {
            res.json({ success: false, message: "Error happend while retreaving opening's data: " + err });
        } else if (opening) {
            res.json({ success: true, message: "Success", opening: opening });
        } else {
            res.json({ success: false, message: "No opening in the database" });
        }
    })
    //}
})


module.exports = router;