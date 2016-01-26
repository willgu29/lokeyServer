var express = require('express');
var router = express.Router();
var User = require("./Models/User.js");
var mongoose = require("mongoose");

/* GET users listing. */
router.get('/', function(req, res, next) {

  var query;
  if (req.body.userID) {
    query = User.findOne({_id:req.body.userID}).limit(req.body.limit).skip(req.body.skip);
  } else {
    query = User.find({}).limit(req.body.limit).skip(req.body.skip);
  }

  query.select('-password -phoneNumber');
  query.exec(function (err, users) {
    if (err) { console.log(err);} 
    else { res.json(users);}
  });
});

router.post('/createAccount', function (req, res) {
        console.log("/createAccount POST");
        var newUser = new User({ email: req.body.email,
        						phoneNumber: req.body.phoneNumber,
                                password: req.body.password,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                fullName: req.body.firstName+' '+req.body.lastName,
                                initialGroupCode: req.body.initialGroupCode});
        
        newUser.save(function (err, newUser) {
                if (err) {
                	console.error(err);
                	return res.send("There was an error creating your account. Please try again in a minute.");
                } else {
                	console.log(newUser);
                	return res.json(newUser);
                }
        });
});




module.exports = router;
