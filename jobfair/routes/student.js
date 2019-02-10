const express = require("express");
const router = express.Router();

const Student = require('../models/student');
const Fair = require('../models/fair');

const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.use((req, res, next) => {
    //  console.log("student PROVERA");
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

router.get('/account/:id', (req, res) => {
    let id = req.params.id;
    if (req.decoded.type != "student") {
        res.json({ success: false, message: "This data is only for students" });
    } else if (id !== req.decoded.id) {
        res.json({ success: false, message: "Access to others student's data is not allowed" })
    } else {
        Student.findById(id, (err, student) => {
            if (err) {
                res.json({ success: false, message: "Error happend while retrieving student's data: ".message });
            } else if (student) {
                res.json({ success: true, message: "Success", student: student });
            } else {
                res.json({ success: false, message: "No student in the database" });
            }
        })
    }
})

router.post('/cvupdate', (req, res) => {
    let id = req.decoded.id;
    Fair.findOne({ finished: false }, (err, fair) => {
        if (err) {
            res.json({ success: false, message: "Error happened while checking cv update deadline" + err.message });
        } else if (fair) {
            let today = new Date();
            let cvdl = new Date(fair.cvDeadline);
            if (cvdl < today) {
                res.json({ success: false, message: "Updating cv is not allowed at the moment" });
            } else {
                Student.findById(id, (err, student) => {
                    if (err) {
                        res.json({ success: false, message: "Error happend while retrieving student's data: " + err.message });
                    } else if (student) {

                        let cv = req.body;
                        console.log("cv");
                        console.log(cv);
                        student.set({ cv: cv });
                        student.$ignore('password');
                        student.save((err, updatedStudent) => {
                            if (err) {
                                if (err.errors) {
                                    for (const key in err.errors) {
                                        res.json({ success: false, message: err.errors[key].message });
                                        break;
                                    }
                                } else {
                                    res.json({ success: false, message: 'Could not save cv info. Error: ' + err.message, student: null });
                                }
                            } else if (updatedStudent) {
                                res.json({ success: true, message: 'Success!', student: updatedStudent });
                            } else {
                                res.json({ success: false, message: "Could not save cv info", student: null });
                            }
                        })
                    } else {
                        res.json({ success: false, message: "No student in the database" });
                    }
                });
            }
        } else {
            res.json({ success: false, message: "Updating cv is not allowed. There is no opened fair" });
        }
    })

})

module.exports = router;