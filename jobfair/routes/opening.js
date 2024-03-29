const express = require("express");
const router = express.Router();

const Company = require('../models/company');
const Opening = require('../models/opening');

const jwt = require('jsonwebtoken');
const config = require('../config/database');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads/'); },
    filename: (req, file, cb) => { cb(null, new Date().getTime() + '_' + file.originalname.split(' ').join('_')); }
});
const upload = multer({
    storage: storage,
});


router.use((req, res, next) => {
    // console.log("student PROVERA");
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

router.get('/info/:id', (req, res) => {
    let id = req.params.id;
    Opening.findById(id, (err, opening) => {
        if (err) {
            res.json({ success: false, message: "Error happend while retrieving opening's data: " + err.message });
        } else if (opening) {
            res.json({ success: true, message: "Success", opening: opening });
        } else {
            res.json({ success: false, message: "No opening in the database" });
        }
    });
})

router.post('/create', upload.array('file'), (req, res) => {
    console.log(req);
    if (req.decoded.type != "company") {
        res.json({ success: false, message: "This option is only for companies" });
    } else if (!req.body.companyId || req.body.companyId == "") {
        res.json({ success: false, message: "You must provide company id" });
    } else {
        Company.findById(req.body.companyId, (err, company) => {
            if (err) {
                res.json({ success: false, message: "Error happened while searching for a company " + err.message });
            } else if (company) {
                if (req.decoded.id != company._id) {
                    res.json({ success: false, message: "Making openings for other companies is not allowed" });
                } else {
                    let opening = new Opening(req.body);
                    opening.files = req.files.map(file => file.path);
                    console.log(opening);
                    opening.save((err) => {
                        if (err) {
                            if (err.errors) {
                                for (const key in err.errors) {
                                    res.json({ success: false, message: err.errors[key].message });
                                    break;
                                }
                            } else {
                                res.json({ success: false, message: 'Could not save the opening. Error: ' + err.message });
                            }
                        }
                        else {
                            res.json({ success: true, message: 'Opening created' }); // Return success
                        }
                    });
                }
            } else {
                res.json({ success: false, message: "No company in the database" });
            }
        });
    }
});

router.post('/update', (req, res) => {
    console.log(req.body);
    // if (req.decoded.type != "company") {
    //     res.json({ success: false, message: "This option is only for companies" });
    // } else if (!req.body.companyId || req.body.companyId == "") {
    //     res.json({ success: false, message: "You must provide company id" });
    // } else if (req.decoded.id != req.body.companyId) {
    //     res.json({ success: false, message: "Making decisions for other companies is not allowed" });
    // } else {
    Opening.findById(req.body._id, (err, opening) => {
        if (err) {
            res.json({ success: false, message: 'Error happened while retrieving opening data' + err.message });
        } else if (opening) {
            opening.set({ applications: req.body.applications });
            opening.save((err) => {
                if (err) {
                    if (err.errors) {
                        for (const key in err.errors) {
                            res.json({ success: false, message: err.errors[key].message });
                            break;
                        }
                    } else {
                        res.json({ success: false, message: 'Could not save the opening. Error: ' + err.message });
                    }
                }
                else {
                    res.json({ success: true, message: 'Opening updated' }); // Return success
                }
            });
        } else {
            res.json({ success: false, message: 'There is no opening in the database' });
        }
    });
    // }
});

router.post('/apply', upload.single('coverLetter'), (req, res) => {
    if (req.decoded.type != "student") {
        res.json({ success: false, message: "This option is only for students" });
    } else if (!req.body.studentId) {
        res.json({ success: false, message: "You must provide student id" });
    } else if (req.body.studentId != req.decoded.id) {
        res.json({ success: false, message: "Making applications for other students is not allowed" });
    } else if (!req.body.openingId || req.body.openingId == "") {
        res.json({ success: false, message: "You must provide opening id" });
    } else {
        Opening.findById(req.body.openingId, (err, opening) => {
            if (err) {
                res.json({ success: false, message: "Error happened while searching for an opening " + err.message });
            } else if (opening) {
                let today = new Date();
                if (today > opening.deadline) {
                    res.json({ success: false, message: "Applications are closed" });
                } else {
                    let application = req.body;
                    if (req.file) {
                        application.coverLetter = req.file.path;
                    }
                    if (req.body.cv) {
                        application.cv = JSON.parse(req.body.cv);
                    }
                    console.log(application);
                    opening.applications.push(application);
                    console.log(opening);
                    opening.save((err) => {
                        if (err) {
                            if (err.errors) {
                                for (const key in err.errors) {
                                    res.json({ success: false, message: err.errors[key].message });
                                    break;
                                }
                            } else {
                                res.json({ success: false, message: 'Could not save the application. Error: ' + err.message });
                            }
                        }
                        else {
                            res.json({ success: true, message: 'Application created' }); // Return success
                        }
                    });
                }
            } else {
                res.json({ success: false, message: "No opening " + req.body.openingId + " in the database" });
            }
        })

    }
});



module.exports = router;