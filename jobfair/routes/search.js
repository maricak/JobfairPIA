var express = require("express");
var router = express.Router();

const Company = require('../models/company');
const Opening = require('../models/opening');

router.post('/basic', (req, res) => {
    console.log(req.body);
    let searchOptions = {}
    if (req.body.name && req.body.name != "") {
        searchOptions.name = req.body.name;
    }

    if (req.body.city && req.body.city != "") {
        searchOptions.city = req.body.city;
    }

    if (req.body.workFields && req.body.workFields != "") {
        searchOptions.workField = { $in: req.body.workFields };
    }
    console.log(searchOptions);
    Company.find(searchOptions, { _id: 0, password: 0 }, (err, companies) => {
        if (err) {
            res.json({ success: false, message: "Error happened while searching: " + err });
        } else {
            res.json({ success: true, message: "Sucess!", companies: companies });

        }
    })
});


router.post('/complex', (req, res) => {
    //console.log(req.body);
    let searchOptions = {}
    if (!req.body.choice || req.body.choice == "") {
        res.json({ success: false, message: "You must provide search criteria" })
    } else {
        if (req.body.companyName && req.boy.companyName != "") {
            searchOptions.companyName = req.body.companyName;
        }
        if (req.body.openingName && req.boy.openingName != "") {
            searchOptions.name = req.body.openingName;
        } if (choice == "job" || choice == "internship") {
            searchOptions.type = choice;
        }     
        Opening.find(searchOptions, (err, openings) => {
            if (err) {
                res.json({ success: false, message: "Error happened whil searchig jobs" + err });
            } else {
                if (choice == "company") {
                    Company.find({name : {  }})
                } else {
                    res.json({ success: true, message: "Success", opening: openings });
                }
            }
        })         
    }
});


module.exports = router;
