var express = require("express");
var router = express.Router();

const Student = require('../models/student');
const Admin = require('../models/admin');
const Company = require('../models/company');

router.post('/student', (req, res) => {
    console.log(req.body);
    found = false;
    Admin.find({ $or: [{ username: req.body.username }, { email: req.body.email }] }, (err, admin) => {
        if (err) { console.log(err); }
        else if (admin) { found = true; }
    });
    Company.find({ $or: [{ username: req.body.username }, { email: req.body.email }] }, (err, company) => {
        if (err) { console.log(err); }
        else if (company) { found = true; }
    });

    if (found) {
        res.json({ success: false, message: 'Username or e-mail already exists' });
    } else {
        let student = new Student(req.body);
        console.log(student);
        student.save((err) => {
            if (err) {
                if (err.code && err.code === 11000) {
                    res.json({ success: false, message: 'Username or e-mail already exists' });
                } else if (err.errors) {
                    for (const key in err.errors) {
                        res.json({ success: false, message: err.errors[key].message });
                        break;
                    }
                } else {
                    res.json({ success: false, message: 'Could not save student. Error: ' + err.message });
                }
            } else {
                res.json({ success: true, message: 'Acount registered!' }); // Return success
            }
        });
    }
});

router.post('/admin', (req, res) => {
    found = false;
    Student.find({ $or: [{ username: req.body.username }, { email: req.body.email }] }, (err, student) => {
        if (err) { console.log(err); }
        else if (student) { found = true; }
    });
    Company.find({ $or: [{ username: req.body.username }, { email: req.body.email }] }, (err, company) => {
        if (err) { console.log(err); }
        else if (company) { found = true; }
    });
    
    if (found) {
        res.json({ success: false, message: 'Username or e-mail already exists' });
    } else {
        let admin = new Admin(req.body);
        admin.save((err) => {
            if (err) {
                if (err.code && err.code === 11000) {
                    res.json({ success: false, message: 'Username or e-mail already exists' });
                } else if (err.errors) {
                    for (const key in err.errors) {
                        res.json({ success: false, message: err.errors[key].message });
                        break;
                    }
                } else {
                    res.json({ success: false, message: 'Could not save admin. Error: ' + err.message });
                }
            }
            else {
                res.json({ success: true, message: 'Account registered!' });
            }
        });
    }
});


router.post('/company', (req, res) => {
    found = false;
    Admin.find({ $or: [{ username: req.body.username }, { email: req.body.email }] }, (err, admin) => {
        if (err) { console.log(err); }
        else if (admin) { found = true; }
    });
    Student.find({ $or: [{ username: req.body.username }, { email: req.body.email }] }, (err, student) => {
        if (err) { console.log(err); }
        else if (student) { found = true; }
    });

    if (found) {
        res.json({ success: false, message: 'Username or e-mail already exists' });
    } else {
        let company = new Company(req.body);
        company.save((err) => {
            if (err) {
                if (err.code && err.code === 11000) {
                    res.json({ success: false, message: 'Username, e-mail or website already exists' });
                } else if (err.errors) {
                    for (const key in err.errors) {
                        res.json({ success: false, message: err.errors[key].message });
                        break;
                    }
                } else {
                    res.json({ success: false, message: 'Could not save company. Error: ' + err.message });
                }
            }
            else {
                res.json({ success: true, message: 'Account registered!' });
            }
        });
    }
});

module.exports = router;
