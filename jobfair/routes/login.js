const express = require("express");
const router = express.Router();

const Student = require('../models/student');
const Admin = require('../models/admin');
const Company = require('../models/company');

const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.post('/student', (req, res) => {
    if (!req.body.username || req.body.username == "") {
        res.json({ success: false, message: 'You must provide a username', token: null, username: null });
    } else if (!req.body.password || req.body.password == "") {
        res.json({ success: false, message: 'You must provide a password', token: null, username: null });
    } else {
        Student.findOne({ username: req.body.username }, (err, student) => {
            if (err) {
                res.json({ success: false, message: err });
            } else if (student) {
                if (student.comparePassword(req.body.password)) {
                    const token = jwt.sign({ id: student._id, type: "student" }, config.secret, { expiresIn: '24h' }); // Create a token for client
                    res.json({ success: true, message: 'Success!', token: token, user: student }); // Return success and token to frontend
                } else {
                    res.json({ success: false, message: "Wrong password", toke: null, username: null })
                }
            } else {
                res.json({ success: false, message: 'No student in the database', token: null, username: null });
            }
        });
    }
});

router.post('/company', (req, res) => {
    if (!req.body.username || req.body.username == "") {
        res.json({ success: false, message: 'You must provide a username', token: null, username: null });
    } else if (!req.body.password || req.body.password == "") {
        res.json({ success: false, message: 'You must provide a password', token: null, username: null });
    } else {
        Company.findOne({ username: req.body.username }, (err, company) => {
            if (err) {
                res.json({ success: false, message: err });
            } else if (company) {
                if (company.comparePassword(req.body.password)) {
                    const token = jwt.sign({ id: company._id, type: "company" }, config.secret, { expiresIn: '24h' }); // Create a token for client
                    res.json({ success: true, message: 'Success!', token: token, user: company }); // Return success and token to frontend
                } else {
                    res.json({ success: false, message: "Wrong password", toke: null, username: null })
                }
            } else {
                res.json({ success: false, message: 'No company in the database', token: null, username: null });
            }
        });
    }
});

router.post('/admin', (req, res) => {
    if (!req.body.username || req.body.username == "") {
        res.json({ success: false, message: 'You must provide a username', token: null, username: null });
    } else if (!req.body.password || req.body.password == "") {
        res.json({ success: false, message: 'You must provide a password', token: null, username: null });
    } else {
        Admin.findOne({ username: req.body.username }, (err, admin) => {
            if (err) {
                res.json({ success: false, message: err });
            } else if (admin) {
                if (admin.comparePassword(req.body.password)) {
                    const token = jwt.sign({ id: admin._id, type: "admin" }, config.secret, { expiresIn: '24h' }); // Create a token for client
                    res.json({ success: true, message: 'Success!', token: token, user:admin }); // Return success and token to frontend
                } else {
                    res.json({ success: false, message: "Wrong password", toke: null, username: null })
                }
            } else {
                res.json({ success: false, message: 'No admin in the database', token: null, username: null });
            }
        });
    }
});


module.exports = router;
