const express = require("express");
const router = express.Router();

const Company = require('../models/company');
const Opening = require('../models/opening');


const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.use((req, res, next) => {
    // console.log("student PROVERA");
    let token = req.headers['auth'];
    if (!token) {
        res.json({ success: false, message: "No token provided" });
    } else {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.json({ success: false, message: "Token invalid: " + err.message });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
});

router.get('/info/:id', (req, res) => {
    let id = req.params.id;
    if (req.decoded.type != "student") {
        res.json({ success: false, message: "This data is only for students" });
    } else {
        Company.findById(id, (err, company) => {
            if (err) {
                res.json({ success: false, message: "Error happend while retrieving company's data: " + err.message });
            } else if (company) {
                Opening.find({ companyId: company._id }, (err, openings) => {
                    if (err) {
                        res.json({ success: false, message: "Error happend while retrieving openings: " + err.message });
                    } else if (openings) {
                        res.json({ success: true, message: "Success", company: company, openings: openings });
                    } else {
                        res.json({ success: true, message: "Success", company: company, openings: [] });
                    }
                })
            } else {
                res.json({ success: false, message: "No company in the database" });
            }
        })
    }
});

// NE TREBA
router.get('/account/:id', (req, res) => {
    if (!req.params.id || req.params.id == "") {
        res.json({ success: false, message: "You must provide id" });
    } else {
        let id = req.params.id;
        /* if(req.decoded.type != "company") {
             res.json({success : false, message : "This data is only for companies"});
         } else if (id !== req.decoded.id) {
             res.json({ success: false, message: "Access to others company's data is not allowed" })
         } else {*/
        Company.findById(id, (err, company) => {
            if (err) {
                res.json({ success: false, message: "Error happend while retrieving company's data: " + err.message });
            } else if (company) {
                res.json({ success: true, message: "Success", company: company });
            } else {
                res.json({ success: false, message: "No company in the database" });
            }
        })
        /*}*/
    }
})


router.get('/openings/:id', (req, res) => {
    let id = req.params.id;
    if (req.decoded.type != "company") {
        res.json({ success: false, message: "This data is only for companies" });
    } else if (id !== req.decoded.id) {
        res.json({ success: false, message: "Access to others company's data is not allowed" })
    } else {
        Company.findById(id, (err, company) => {
            if (err) {
                res.json({ success: false, message: "Error happend while retrieving company's data: " + err.message });
            } else if (company) {
                Opening.find({ companyId: company._id }, (err, openings) => {
                    if (err) {
                        res.json({ success: false, message: "Error happend while retrieving company's openings: " + err.message });
                    } else if (openings) {
                        res.json({ success: true, message: "Success", openings: openings });
                    } else {
                        res.json({ success: true, message: "No openings in the database", openings: [] });
                    }
                });
            } else {
                res.json({ success: false, message: "No company in the database" });
            }
        });
    }
});


module.exports = router;
