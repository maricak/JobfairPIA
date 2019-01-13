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
    console.log(req.decoded);
    if(req.decoded.type != "student") {
        res.json({success : false, message : "This daa is only for stdents"});
    } else if (id !== req.decoded.id) {
        res.json({ success: false, message: "Access to others student's data is not allowed" })
    } else {
        Student.findById(id, (err, student) => {
            if (err) {
                res.json({ success: false, message: "Error happend while retreaving student's data: " + err });
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
            res.json({ success: false, message: "Error happend while retreaving student's data: " + err });
        } else if (student) {

            let cv = req.body.cv;
            console.log(cv);
            student.cv = cv;
            student.$ignore('password');
            student.save((err, updatedStudent) => {
                console.log(err);
                if (err) {
                    if (err.errors) {
                        if (err.errors['cv.telephone']) {
                            res.json({ success: false, message: err.errors['cv.telephone'].message });
                        } else if (err.errors['cv.email']) {
                            res.json({ success: false, message: err.errors['cv.email'].message });
                        } else if (err.errors['cv.webSite']) {
                            res.json({ success: false, message: err.errors['cv.webSite'].message });
                        } else if (err.errors['cv.sex']) {
                            res.json({ success: false, message: err.errors['cv.sex'].message });
                        } else {
                            res.json({ success: false, message: err });
                        }
                    } else {
                        res.json({ success: false, message: 'Could not save cv info. Error: ' + err });
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