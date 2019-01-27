var express = require("express");
var router = express.Router();

const Company = require('../models/company');
const Opening = require('../models/opening');

const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.post('/basic', (req, res) => {
    console.log(req.body);
    let searchOptions = {}
    if (req.body.name && req.body.name != "") {
        searchOptions.name = req.body.name;
    }
    if (req.body.city && req.body.city != "") {
        searchOptions.city = req.body.city;
    }
    if (req.body.workFields && req.body.workFields != "") {
        searchOptions.workField = { $in: req.body.workFields };
    }
    console.log(searchOptions);
    Company.find(searchOptions, {password: 0 }, (err, companies) => {
        if (err) {
            res.json({ success: false, message: "Error happened while searching: " + err.message  });
        } else {
            res.json({ success: true, message: "Sucess!", companies: companies });

        }
    })
});

router.use((req, res, next) => {
    console.log("student PROVERA");
    let token = req.headers['auth'];
    if (!token) {
        res.json({ success: false, message: "No token provided" });
    } else {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.json({ success: false, message: "Token invalid: " + err.message  });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
});

router.post('/complex', (req, res) => {
    if (req.decoded.type != "student") {
        res.json({ success: false, message: "This data is only for students" });
    } else {
        let searchOptions = {}
        if (!req.body.choice || req.body.choice == "") {
            res.json({ success: false, message: "You must provide search choice" })
        } else if (req.body.choice !== "job" && req.body.choice !== "internship"
            && req.body.choice !== "company" && req.body.choice !== "all") {
            res.json({ success: false, message: "You must provide a valid search choice : job / internship / company / all" })
        } else {
            if (req.body.companyName && req.body.companyName != "") {
                searchOptions.companyName = { $regex: ".*" + req.body.companyName + ".*" };
            }
            if (req.body.openingName && req.body.openingName != "") {
                searchOptions.name = { $regex: ".*" + req.body.openingName + ".*" };
            } if (req.body.choice == "job" || req.body.choice == "internship") {
                searchOptions.type = req.body.choice;
            }
            if (req.body.choice == "company" && !(searchOptions.name)) {
                Company.find({ name: { $regex: ".*" + req.body.companyName + ".*" } }, {password: 0 }, (err, companies) => {
                    if (err) {
                        res.json({ success: false, message: "Error happened whil searchig companies" + err.message  });
                    } else {
                        res.json({ success: true, message: "Success", companies: companies });
                    }
                });
            } else {
                Opening.find(searchOptions, (err, openings) => {
                    if (err) {
                        res.json({ success: false, message: "Error happened whil searching openings" + err.message  });
                    } else {
                        if (req.body.choice == "company") {
                            let companyUsernames = openings.map((e) => { return e.companyUsername; });
                            Company.find({ username: { $in: companyUsernames } }, { password: 0 }, (err, companies) => {
                                if (err) {
                                    res.json({ success: false, message: "Error happened whil searchig companies" + err.message  });
                                } else {
                                    res.json({ success: true, message: "Success", companies: companies });
                                }
                            })
                        } else {
                            res.json({ success: true, message: "Success", openings: openings });
                        }
                    }
                })
            }
        }
    }
});


module.exports = router;
