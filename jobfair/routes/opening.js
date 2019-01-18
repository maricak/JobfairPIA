var express = require("express");
var router = express.Router();

var Company = require('../models/company');
var Opening = require('../models/opening');


const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.use((req, res, next) => {
    console.log("student PROVERA");
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

router.get('/info/:id', (req, res) => {
    let id = req.params.id;
    if (req.decoded.type != "student") {
        res.json({ success: false, message: "This data is only for students" });
    } else if (id !== req.decoded.id) {
        res.json({ success: false, message: "Access to others student's data is not allowed" })
    } else {
        Opening.findById(id, (err, opening) => {
            if (err) {
                res.json({ success: false, message: "Error happend while retreaving opening's data: " + err });
            } else if (opening) {
                res.json({ success: true, message: "Success", opening: opening });
            } else {
                res.json({ success: false, message: "No opening in the database" });
            }
        })
    }
})

router.post('/create', (req, res) => {
    console.log(req.body);
    if (req.decoded.type != "company") {
        res.json({ success: false, message: "This option is only for companies" });
    } else if (!req.body.name || req.body.name == "") {
        res.json({ success: false, message: 'You must provide a opening name' });
    } else if (!req.body.type || req.body.type == "") {
        res.json({ success: false, message: 'You must provide a type' });
    } else if (req.body.type !== "job" && req.body.type !== "internship") {
        res.json({ success: false, message: 'You must provide a valid type - job/internship' });
    } else if (!req.body.text || req.body.text == "") {
        res.json({ success: false, message: 'You must provide a description' });
    } else if (!req.body.companyUsername || req.body.companyUsername == "") {
        res.json({ success: false, message: 'You must provide a company username' });
    } else if (!req.body.deadline || req.body.deadline == "") {
        res.json({ success: false, message: 'You must provide a deadline' });
    } else {
        Company.findOne({ username: req.body.companyUsername }, (err, company) => {
            if (err) {
                res.json({ success: false, message: "Error happened while searching for a company " + err });
            } else if (company) {
                console.log("decoded");
                console.log(req.decoded);

                console.log("kompanija");
                console.log(company);

                if (req.decoded.id != company._id) {
                    res.json({ success: false, message: "Making openings for other companies is not allowed" });
                } else {
                    let opening = new Opening({
                        companyUsername: company.username,
                        companyName: company.name,
                        type: req.body.type,
                        name: req.body.name,
                        text: req.body.text,
                        deadline: req.body.deadline
                    });
                    console.log(opening);
                    opening.save((err) => {
                        if (err) {
                            if (err.errors) {
                                if (err.errors.companyUsername) {
                                    res.json({ success: false, message: err.errors.companyUsername.message });
                                } else if (err.errors.companyName) {
                                    res.json({ success: false, message: err.errors.companyName.message });
                                } else if (err.errors.type) {
                                    res.json({ success: false, message: err.errors.type.message });
                                } else if (err.errors.name) {
                                    res.json({ success: false, message: err.errors.name.message });
                                } else if (err.errors.text) {
                                    res.json({ success: false, message: err.errors.text.message });
                                } else if (err.errors.deadline) {
                                    res.json({ success: false, message: err.errors.deadline.message });
                                } else {
                                    res.json({ success: false, message: err });
                                }
                            } else {
                                res.json({ success: false, message: 'Could not save the opening. Error: ' + err });
                            }
                        }
                        else {
                            res.json({ success: true, message: 'Opening created' }); // Return success
                        }
                    });
                }
            } else {
                res.json({ success: false, message: "No company" + req.body.username + "in the database" });
            }
        })

    }
});


module.exports = router;