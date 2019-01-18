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

router.get('/info/:username', (req, res) => {
    let username = req.params.username;
    // if (req.decoded.type != "student") {
    //     res.json({ success: false, message: "This data is only for students" });
    // } else if (id !== req.decoded.id) {
    //     res.json({ success: false, message: "Access to others student's data is not allowed" })
    // } else {
        Company.findOne({ username: username }, (err, company) => {
            if (err) {
                res.json({ success: false, message: "Error happend while retreaving company's data: " + err });
            } else if (company) {
                Opening.find({ companyUsername: username }, (err, openings) => {
                    if (err) {
                        res.json({ success: false, message: "Error happend while retreaving openings: " + err });
                    } else {
                        res.json({ success: true, message: "Success", company: company, openings : openings });
                    }
                })
            } else {
                res.json({ success: false, message: "No company in the database" });
            }
        })
    //}
});


router.get('/acc/:id', (req, res) => {
    let id = req.params.id;
   /* if(req.decoded.type != "company") {
        res.json({success : false, message : "This data is only for companies"});
    } else if (id !== req.decoded.id) {
        res.json({ success: false, message: "Access to others company's data is not allowed" })
    } else {*/
        Company.findById(id, (err, company) => {
            if (err) {
                res.json({ success: false, message: "Error happend while retreaving company's data: " + err });
            } else if (company) {
                res.json({ success: true, message: "Success", company: company });
            } else {
                res.json({ success: false, message: "No company in the database" });
            }
        })
    /*}*/
})



module.exports = router;