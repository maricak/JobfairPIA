var express = require("express");
var router = express.Router();

const Student = require('../models/student');
const Admin = require('../models/admin');
const Company = require('../models/company');

const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.post('/student', (req, res) => {
    if (!req.body.username || req.body.username == "") {
        res.json({ success: false, message: 'You must provide a username' });
    } else if (!req.body.password || req.body.password == "") {
        res.json({ success: false, message: 'You must provide a password' });
    } else if (!req.body.newPassword || req.body.newPassword == "") {
        res.json({ success: false, message: 'You must provide a new password' });
    } else {
        Student.findOne({ username: req.body.username }, (err, student) => {
            if (err) {
                res.json({ success: false, message: 'Could not find the student. Error: ' + err.message });
            } else if (student) {
                if (student.comparePassword(req.body.password)) {
                    student.password = req.body.newPassword;
                    student.save((err, updatedStudent) => {
                        if (err) {
                            if (err.errors) {
                                for (const key in err.errors) {
                                    res.json({ success: false, message: err.errors[key].message });
                                    break;
                                }
                            } else {
                                res.json({ success: false, message: 'Could not save new password. Error: ' + err.message });
                            }
                        } else if (updatedStudent) {
                            res.json({ success: true, message: 'Success!' });
                        } else {
                            res.json({ success: false, message: "Could not save new password" });
                        }
                    });
                } else {
                    res.json({ status: false, message: "Wrong password" })
                }
            } else {
                res.json({ success: false, message: 'No student in the database' });
            }
        });
    }
});


router.post('/admin', (req, res) => {
    if (!req.body.username || req.body.username == "") {
        res.json({ success: false, message: 'You must provide a username' });
    } else if (!req.body.password || req.body.password == "") {
        res.json({ success: false, message: 'You must provide a password' });
    } else if (!req.body.newPassword || req.body.newPassword == "") {
        res.json({ success: false, message: 'You must provide a new password' });
    } else {
        Admin.findOne({ username: req.body.username }, (err, admin) => {
            if (err) {
                res.json({ success: false, message: 'Could not find the admin. Error: ' + err.message  });
            } else if (admin) {
                if (admin.comparePassword(req.body.password)) {
                    admin.password = req.body.newPassword;
                    admin.save((err, updatedAdmin) => {
                        if (err) {
                            if (err.errors) {
                                for (const key in err.errors) {
                                    res.json({ success: false, message: err.errors[key].message });
                                    break;
                                }
                            } else {
                                res.json({ success: false, message: 'Could not save new password. Error: ' + err.message });
                            }
                        } else if (updatedAdmin) {
                            res.json({ success: true, message: 'Success!' });
                        } else {
                            res.json({ success: false, message: "Could not save new password" });
                        }
                    });
                } else {
                    res.json({ status: false, message: "Wrong password" })
                }
            } else {
                res.json({ success: false, message: 'No admin in the database' });
            }
        });
    }
});

router.post('/company', (req, res) => {
    if (!req.body.username || req.body.username == "") {
        res.json({ success: false, message: 'You must provide a username' });
    } else if (!req.body.password || req.body.password == "") {
        res.json({ success: false, message: 'You must provide a password' });
    } else if (!req.body.newPassword || req.body.newPassword == "") {
        res.json({ success: false, message: 'You must provide a new password' });
    } else {
        Company.findOne({ username: req.body.username }, (err, company) => {
            if (err) {
                res.json({ success: false, message: 'Could not find the company. Error: ' + err.message  });
            } else if (company) {
                if (company.comparePassword(req.body.password)) {
                    company.password = req.body.newPassword;
                    company.save((err, updatedCompany) => {
                        if (err) {
                            if (err.errors) {
                                for (const key in err.errors) {
                                    res.json({ success: false, message: err.errors[key].message });
                                    break;
                                }
                            } else {
                                res.json({ success: false, message: 'Could not save new password. Error: ' + err.message });
                            }
                        } else if (updatedCompany) {
                            res.json({ success: true, message: 'Success!' });
                        } else {
                            res.json({ success: false, message: "Could not save new password" });
                        }
                    });
                } else {
                    res.json({ status: false, message: "Wrong password" })
                }
            } else {
                res.json({ success: false, message: 'No company in the database' });
            }
        });
    }
});




module.exports = router;
