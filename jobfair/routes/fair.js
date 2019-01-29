var express = require("express");
var router = express.Router();

const Fair = require('../models/fair');

const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.use((req, res, next) => {
    //console.log("student PROVERA");
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

router.get('/current', (req, res) => {
    if (req.decoded.type != "admin") {
        res.json({ success: false, message: "This data is only for admins" });
    } else {
        Fair.findOne({ finished: false }, (err, fair) => {
            if (err) {
                res.json({ success: false, message: "Error happened whil searchig fair" + err.message });
            } else {
                res.json({ success: true, message: "Success", fair: fair });
            }
        })
    }
});

router.post('/updateDeadlines', (req, res) => {
    console.log(req.body);

    if (req.decoded.type != "admin") {
        res.json({ success: false, message: "This data is only for admins" });
    } else if (!req.body.fairId || req.body._id == "") {
        res.json({ success: false, message: "You must provide fair id" });
    } else {
        Fair.findById(req.body.fairId, (err, fair) => {
            if (err) {
                res.json({ success: false, message: "Error happened whil searchig for fair" + err.message });
            } else if (fair) {
                if (fair.finished) {
                    res.json({ success: false, message: "The fair is closed" });
                } else {
                    fair.applyDeadline = req.body.applyDeadline;
                    fair.cvDeadline = req.body.cvDeadline;
                    fair.save((err, updatedFair) => {
                        if (err) {
                            if (err.errors) {
                                for (const key in err.errors) {
                                    res.json({ success: false, message: err.errors[key].message });
                                    break;
                                }
                            } else {
                                res.json({ success: false, message: 'Could not update the fair. Error: ' + err.message });
                            }
                        } else {
                            res.json({ success: true, message: 'Fair updated', fair: updatedFair }); // Return success
                        }
                    })
                }
                res.json({ success: true, message: "Success", fair: fair });
            } else {
                res.json({ success: false, message: "No fair in the database" });
            }
        })
    }
});


router.post('/create', (req, res) => {
    console.log(req.body);
    if (req.decoded.type != "admin") {
        res.json({ success: false, message: "This option is only for admins" });
    } else {
        let fair = new Fair(req.body);
        console.log(fair);
        fair.save((err, newFair) => {
            if (err) {
                if (err.errors) {
                    for (const key in err.errors) {
                        res.json({ success: false, message: err.errors[key].message });
                        break;
                    }
                } else {
                    res.json({ success: false, message: 'Could not save the fair. Error: ' + err.message });
                }
            }
            else if (newFair) {
                res.json({ success: true, message: 'Fair created', fair: newFair }); // Return success
            } else {
                res.json({ success: false, message: 'Could not save the fair. Error: ' + err.message });
            }
        });
    }
});


module.exports = router;
