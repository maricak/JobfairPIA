var express = require("express");
var router = express.Router();

var Student = require('../models/student');


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
    Student.findById(id, (err, student) => {
        if (err) {
            res.json({ success: false, message: "Error happend while retrieving student's data: " + err.message });
        } else if (student) {

            let cv = req.body.cv;
            console.log(cv);
            student.cv = cv;
            student.$ignore('password');
            student.save((err, updatedStudent) => {
                console.log(err);
                if (err) {
                    if (err.errors) {
                        for (const key in err.errors) {
                            res.json({ success: false, message: err.errors[key].message });
                            break;
                        }
                    } else {
                        res.json({ success: false, message: 'Could not save cv info. Error: ' + err.message });
                    }
                } else if (updatedStudent) {
                    res.json({ success: true, message: 'Success!' });
                } else {
                    res.json({ success: false, message: "Could not save cv info" });
                }
            })
        } else {
            res.json({ success: false, message: "No student in the database" });
        }
    });
})

module.exports = router;