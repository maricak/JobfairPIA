const express = require("express");
const router = express.Router();

const Student = require('../models/student');
const Admin = require('../models/admin');
const Company = require('../models/company');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads/'); },
    filename: (req, file, cb) => { cb(null, new Date().getTime() + '_' + file.originalname.split(' ').join('_')); }
});
const upload = multer({
    storage: storage,
});

const imageSize = require('image-size');


router.post('/student', upload.single('image'), (req, res) => {
    const imageInfo = imageSize(req.file.path);

    if (imageInfo.type != "jpg" && imageInfo.type != "png") {
        res.json({ success: false, message: "Image must be of type jpg or png" })
    } else if (imageInfo.height > 300 || imageInfo.height < 100 ||
        imageInfo.width > 300 || imageInfo.width < 100) {
        res.json({ success: false, message: "Image size must be between 100x100 and 300x300" });
    } else {

        imagePath = req.file.path;
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
            student.image = imagePath;
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
                    res.json({ success: true, message: 'Account registered!' }); // Return success
                }
            });
        }
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


router.post('/company', upload.single('image'), (req, res) => {
    const imageInfo = imageSize(req.file.path);

    if (imageInfo.type != "jpg" && imageInfo.type != "png") {
        res.json({ success: false, message: "Image must be of type jpg or png" })
    } else if (imageInfo.height > 300 || imageInfo.height < 100 ||
        imageInfo.width > 300 || imageInfo.width < 100) {
        res.json({ success: false, message: "Image size must be between 100x100 and 300x300" });
    } else {

        imagePath = req.file.path;
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
            company.image = imagePath;
            console.log(company);

            company.save((err) => {
                if (err) {
                    if (err.code && err.code === 11000) {
                        res.json({ success: false, message: 'Username, e-mail or website already exists' + err });
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
    }
});

module.exports = router;
