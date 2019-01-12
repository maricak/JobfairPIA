var express = require("express");
var router = express.Router();

const Student = require('../models/student');
const Admin = require('../models/admin');
const Company = require('../models/company');

router.post('/register/student', (req, res) => {
    if (!req.body.username || req.body.username == "") {
        res.json({ success: false, message: 'You must provide a username' });
    } else if (!req.body.password || req.body.password == "") {
        res.json({ success: false, message: 'You must provide a password' });
    } else if (!req.body.name || req.body.name == "") {
        res.json({ success: false, message: 'You must provide a name' });
    } else if (!req.body.surname || req.body.surname == "") {
        res.json({ success: false, message: 'You must provide a surname' });
    } else if (!req.body.telephone || req.body.telephone == "") {
        res.json({ success: false, message: 'You must provide a telephone' });
    } else if (!req.body.email || req.body.email == "") {
        res.json({ success: false, message: 'You must provide an e-mail' });
    } else if (!req.body.currentYear || req.body.currentYear == "") {
        res.json({ success: false, message: 'You must provide a current year' });
    } else if (!req.body.graduated || req.body.graduated == "") {
        res.json({ success: false, message: 'You must provide graduation information' });
    } else {
        let student = new Student({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            surname: req.body.surname,
            telephone: req.body.telephone,
            email: req.body.email,
            currentYear: req.body.currentYear,
            graduated: req.body.graduated,
        });
        student.save((err) => {
            if (err) {
                // console.log(err.code);
                if (err.code && err.code === 11000) {
                    res.json({ success: false, message: 'Username or e-mail already exists' });
                } else if (err.errors) {
                    if (err.errors.username) {
                        res.json({ success: false, message: err.errors.username.message });
                    } else if (err.errors.password) {
                        res.json({ success: false, message: err.errors.password.message });
                    } else if (err.errors.name) {
                        res.json({ success: false, message: err.errors.name.message });
                    } else if (err.errors.surname) {
                        res.json({ success: false, message: err.errors.surname.message });
                    } else if (err.errors.telephone) {
                        res.json({ success: false, message: err.errors.telephone.message });
                    } else if (err.errors.email) {
                        res.json({ success: false, message: err.errors.email.message });
                    } else if (err.errors.currentYear) {
                        res.json({ success: false, message: err.errors.currentYear.message });
                    } else if (err.errors.graduated) {
                        res.json({ success: false, message: err.errors.graduated.message });
                    } else {
                        res.json({ success: false, message: err });
                    }
                } else {
                    res.json({ success: false, message: 'Could not save student. Error: ' + err });
                }
            }
            else {
                res.json({ success: true, message: 'Acount registered!' }); // Return success
            }
        });
    }
});

router.post('/register/admin', (req, res) => {
    if (!req.body.username || req.body.username == "") {
        res.json({ success: false, message: 'You must provide a username' });
    } else if (!req.body.password || req.body.password == "") {
        res.json({ success: false, message: 'You must provide a password' });
    } else if (!req.body.name || req.body.name == "") {
        res.json({ success: false, message: 'You must provide a name' });
    } else if (!req.body.surname || req.body.surname == "") {
        res.json({ success: false, message: 'You must provide a surname' });
    } else if (!req.body.telephone || req.body.telephone == "") {
        res.json({ success: false, message: 'You must provide a telephone' });
    } else if (!req.body.email || req.body.email == "") {
        res.json({ success: false, message: 'You must provide an e-mail' });
    } else {
        let admin = new Admin({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            surname: req.body.surname,
            telephone: req.body.telephone,
            email: req.body.email
        });
        admin.save((err) => {
            if (err) {
                // console.log(err.code);
                if (err.code && err.code === 11000) {
                    res.json({ success: false, message: 'Username or e-mail already exists' });
                } else if (err.errors) {
                    if (err.errors.username) {
                        res.json({ success: false, message: err.errors.username.message });
                    } else if (err.errors.password) {
                        res.json({ success: false, message: err.errors.password.message });
                    } else if (err.errors.name) {
                        res.json({ success: false, message: err.errors.name.message });
                    } else if (err.errors.surname) {
                        res.json({ success: false, message: err.errors.surname.message });
                    } else if (err.errors.telephone) {
                        res.json({ success: false, message: err.errors.telephone.message });
                    } else if (err.errors.email) {
                        res.json({ success: false, message: err.errors.email.message });
                    } else {
                        res.json({ success: false, message: err });
                    }
                } else {
                    res.json({ success: false, message: 'Could not admin user. Error: ' + err });
                }
            }
            else {
                res.json({ success: true, message: 'Account registered!' }); // Return success
            }
        });
    }
});


router.post('/register/company', (req, res) => {
    console.log(req.body);
    if (!req.body.username || req.body.username == "") {
        res.json({ success: false, message: 'You must provide a username' });
    } else if (!req.body.password || req.body.password == "") {
        res.json({ success: false, message: 'You must provide a password' });
    } else if (!req.body.name || req.body.name == "") {
        res.json({ success: false, message: 'You must provide a name' });
    } else if (!req.body.city || req.body.city == "") {
        res.json({ success: false, message: 'You must provide a city' });
    } else if (!req.body.address || req.body.address == "") {
        res.json({ success: false, message: 'You must provide a address' });
    } else if (!req.body.pib || req.body.pib == "") {
        res.json({ success: false, message: 'You must provide a pib' });
    } else if (!req.body.numberOfEmployees || req.body.numberOfEmployees == "") {
        res.json({ success: false, message: 'You must provide number of employees' });
    } else if (!req.body.email || req.body.email == "") {
        res.json({ success: false, message: 'You must provide an e-mail' });
    } else if (!req.body.webSite || req.body.webSite == "") {
        res.json({ success: false, message: 'You must provide web site' });
    } else if (!req.body.workField || req.body.workField == "") {
        res.json({ success: false, message: 'You must provide work filed' });
    } else if (!req.body.speciality || req.body.speciality == "") {
        res.json({ success: false, message: 'You must provide speciality' });
    } else {
        let company = new Company({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            city: req.body.city,
            address: req.body.address,
            pib: req.body.pib,
            numberOfEmployees: req.body.numberOfEmployees,
            email: req.body.email,
            webSite: req.body.webSite,
            workField: req.body.workField,
            speciality: req.body.speciality,
        });
        console.log(company);
        company.save((err) => {
            if (err) {
                if (err.code && err.code === 11000) {
                    res.json({ success: false, message: 'Username, e-mail or website already exists' });
                } else if (err.errors) {
                    if (err.errors.username) {
                        res.json({ success: false, message: err.errors.username.message });
                    } else if (err.errors.password) {
                        res.json({ success: false, message: err.errors.password.message });
                    } else if (err.errors.name) {
                        res.json({ success: false, message: err.errors.name.message });
                    } else if (err.errors.city) {
                        res.json({ success: false, message: err.errors.city.message });
                    } else if (err.errors.address) {
                        res.json({ success: false, message: err.errors.address.message });
                    } else if (err.errors.pib) {
                        res.json({ success: false, message: err.errors.pib.message });
                    } else if (err.errors.numberOfEmployees) {
                        res.json({ success: false, message: err.errors.numberOfEmployees.message });
                    } else if (err.errors.email) {
                        res.json({ success: false, message: err.errors.email.message });
                    } else if (err.errors.webSite) {
                        res.json({ success: false, message: err.errors.webSite.message });
                    } else if (err.errors.workField) {
                        res.json({ success: false, message: err.errors.workField.message });
                    } else if (err.errors.speciality) {
                        res.json({ success: false, message: err.errors.speciality.message });
                    } else {
                        res.json({ success: false, message: err });
                    }
                } else {
                    res.json({ success: false, message: 'Could not save company. Error: ' + err });
                }
            }
            else {
                res.json({ success: true, message: 'Account registered!' }); // Return success
            }
        });
    }
});


module.exports = router;
