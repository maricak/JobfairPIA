var express = require("express");
var router = express.Router();

const Company = require('../models/company');

router.post('/basic', (req, res) => {
    console.log(req.body);
    let searchOptions = {}
    if(req.body.name && req.body.name != "") {
        searchOptions.name = req.body.name;
    }
    
    if(req.body.city && req.body.city != "") {
        searchOptions.city = req.body.city;
    }
    
    if(req.body.workFields && req.body.workFields != "") {
        searchOptions.workField = {$in : req.body.workFields};
    }
    console.log(searchOptions);
    Company.find(searchOptions, {_id : 0, username : 0, password : 0},  (err, companies) => {
        if(err) {
            res.json({success : false, message : "Error happened while searching: " + err});
        } else {
            res.json({success: true, message : "Sucess!" , companies: companies});

        }
    })
});


module.exports = router;
