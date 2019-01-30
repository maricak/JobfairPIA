var express = require("express");
var router = express.Router();

const Fair = require('../models/fair');
const Company = require('../models/company');

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
    // if (req.decoded.type != "admin") {
    //     res.json({ success: false, message: "This data is only for admins" });
    // } else {
    Fair.findOne({ finished: false }, (err, fair) => {
        if (err) {
            res.json({ success: false, message: "Error happened while searching for fair" + err.message });
        } else {
            res.json({ success: true, message: "Success", fair: fair });
        }
    })
    // }
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
            } else {
                res.json({ success: false, message: "No fair in the database" });
            }
        })
    }
});

router.post('/approveCompanies', (req, res) => {
    console.log(req.body);

    if (req.decoded.type != "admin") {
        res.json({ success: false, message: "This data is only for admins" });
    } else if (!req.body.fairId || req.body._id == "") {
        res.json({ success: false, message: "You must provide fair id" });
    } else if (!req.body.applications) {
        res.json({ success: false, message: "You must provide applications" });
    } else {
        Fair.findById(req.body.fairId, (err, fair) => {
            if (err) {
                res.json({ success: false, message: "Error happened whil searchig for fair" + err.message });
            } else if (fair) {
                if (fair.finished) {
                    res.json({ success: false, message: "The fair is closed" });
                } else {
                    let finalMessage = "";
                    req.body.applications.forEach(a => {
                        let index = fair.applications.findIndex(app => app._id == a._id)
                        let localMessage = "";
                        if (a.approved) {
                            a.packages.forEach(package => {
                                let packageIndex = fair.packages.findIndex(p => p._id == package._id);
                                console.log(`packgage index ${packageIndex}`);

                                if (packageIndex != -1 && fair.packages[packageIndex].maxCompanies != -1) {
                                    if (fair.packages[packageIndex].companiesLeft > 0) {
                                        fair.packages[packageIndex].companiesLeft--;
                                    } else {
                                        localMessage += ` No available packages of type ${package.title} for company ${a.companyName} `;
                                        localMessage += "test";
                                    }
                                }
                            });
                        }
                        if (localMessage == "") {
                            fair.applications[index].approved = a.approved;
                            fair.applications[index].reason = a.reason;
                        } else {
                            finalMessage += localMessage;
                        }
                    });
                    // fair.applyDeadline = req.body.applyDeadline;
                    // fair.cvDeadline = req.body.cvDeadline;
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
                            res.json({ success: true, message: `Applications updated ${finalMessage}`, fair: updatedFair }); // Return success
                        }
                    });
                }
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
        // console.log(fair);
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
                console.log(newFair);
                res.json({ success: true, message: 'Fair created', fair: newFair }); // Return success
            } else {
                res.json({ success: false, message: 'Could not save the fair. Error: ' + err.message });
            }
        });
    }
});

router.post('/apply', (req, res) => {
    console.log(req.body);

    if (req.decoded.type != "company") {
        res.json({ success: false, message: "This data is only for companies" });
    } else {
        Company.findById(req.decoded.id, (err, company) => {
            if (err) {
                res.json({ success: false, message: "Error happened while searching for company" + err.message });
            } else if (company) {
                Fair.findOne({ finished: false }, (err, fair) => {
                    if (err) {
                        res.json({ success: false, message: "Error happened while searching for fair" + err.message });
                    } else if (fair) {
                        let today = new Date();
                        let appdl = new Date(fair.applyDeadline);
                        if (appdl < today) {
                            res.json({ success: false, message: "Applying not allowed at the moment" });
                        } else {
                            if (req.body) {
                                let numberFound = 0;
                                let packageIds = req.body; // ids   
                                let chosenPackages = (fair.packages.filter(p =>
                                    packageIds.findIndex(id => (id == p._id)) !== -1
                                ));
                                numberFound += chosenPackages.length;
                                let chosenAdditions = (fair.additional.filter(a =>
                                    packageIds.findIndex(id => (id == a._id)) !== -1
                                ));
                                numberFound += chosenAdditions.length
                                if (packageIds.length != numberFound) {
                                    res.json({ success: false, message: "The fair does not contain one of package ids" });
                                } else {
                                    Fair.findOneAndUpdate({ _id: fair._id }, {
                                        $push: {
                                            applications: {
                                                companyId: company._id,
                                                companyName: company.name,
                                                packages: chosenPackages.concat(chosenAdditions),
                                                approved: false
                                            }
                                        }
                                    }, (err, newFair) => {
                                        if (err) {
                                            res.json({ success: false, message: "Eror happened while saving application " + err.message });
                                        } else if (newFair) {
                                            res.json({ success: true, message: "Success! The application needs approval", fair: newFair });
                                        } else {
                                            res.json({ success: false, message: "Eror happened while saving application" });
                                        }
                                    })
                                }
                            }
                        }
                    } else {
                        res.json({ success: false, message: "No fair in the database that is active" });
                    }
                });
            } else {
                res.json({ success: false, message: "No company in the database" });
            }
        });
    }
});

router.get('/forApproval/:id', (req, res) => {
    let id = req.params.id;
    if (req.decoded.type != "admin") {
        res.json({ success: false, message: "This option is only for admins" });
    } else {
        Fair.findById(id, (err, fair) => {
            if (err) {
                res.json({ success: false, message: "Error happened while searching for the fair " + err.message });
            } else if (fair) {
                if (fair.finished) {
                    res.json({ success: false, message: "The fair is over" });
                } else {
                    if (fair.applications) {
                        let newApplications = fair.applications.filter((a) => a.approved == false && a.reason == '');
                        res.json({ success: true, message: "Success", applications: newApplications });
                    } else {
                        res.json({ success: true, message: "There are no applications for this fair!", applications: [] });
                    }
                }
            } else {
                res.json({ success: false, message: "No fair in the database" });
            }
        })
    }
});


router.get('/finish/:id', (req, res) => {
    let id = req.params.id;
    if (req.decoded.type != "admin") {
        res.json({ success: false, message: "This option is only for admins" });
    } else {
        Fair.findById(id, (err, fair) => {
            if (err) {
                res.json({ success: false, message: "Error happened while searching for the fair " + err.message });
            } else if (fair) {
                if (fair.finished) {
                    res.json({ success: false, message: "The fair is already finished" });
                } else {
                    fair.finished = true;
                    fair.save((err, newFair) => {
                        if (err) {
                            res.json({ success: false, message: "Error happened while saving fair " + err.message });
                        } else if (newFair) {
                            res.json({ success: true, message: "Success", fair: newFair });
                        } else {
                            res.json({ success: false, message: "Could not update the fair" });
                        }
                    });
                }
            } else {
                res.json({ success: false, message: "No fair in the database" });
            }
        })
    }
});


router.post('/updateMaxCompanies', (req, res) => {
    if (req.decoded.type != "admin") {
        res.json({ success: false, message: "This option is only for admins" });
    } else if (!req.body._id || req.body._id == "") {
        res.json({ success: false, message: "You must provide fair id" });
    } else if (!req.body.packages || req.body.packages == "") {
        res.json({ success: false, message: "You must provide packages" });
    } else {
        let id = req.body._id;
        Fair.findById(id, (err, fair) => {
            if (err) {
                res.json({ success: false, message: "Error happened while searching for the fair " + err.message });
            } else if (fair) {
                if (fair.finished) {
                    res.json({ success: false, message: "The fair is finished" });
                } else {
                    let message = "";
                    let packages = req.body.packages;

                    packages.forEach(p => {
                        let index = fair.packages.findIndex(pcg => pcg._id == p._id);
                        console.log(`index ${index}`);
                        if (index == -1) {
                            message += ` No package ${p.title} `;
                        } else if (fair.packages[index].maxCompanies == -1) {
                            if (p.maxCompanies != -1) {
                                message += `The package ${p.title} had value -1. Cannot change`;
                            }
                        } else if (((fair.packages[index].maxCompanies - fair.packages[index].companiesLeft) > p.maxCompanies) && p.maxCompanies != -1) {
                            message += `The package ${p.title} was already approved. Cannot decrement now`;
                        } else {
                            fair.packages[index].maxCompanies = p.maxCompanies;
                            fair.packages[index].companiesLeft = p.companiesLeft;
                        }
                    });
                    fair.save((err, newFair) => {
                        if (err) {
                            res.json({ success: false, message: "Error happened while saving fair " + err.message });
                        } else if (newFair) {
                            res.json({ success: true, message: "Success: " + message, fair: newFair });
                        } else {
                            res.json({ success: false, message: "Could not update the fair" });
                        }
                    });
                }
            } else {
                res.json({ success: false, message: "No fair in the database" });
            }
        })
    }
});
module.exports = router;
