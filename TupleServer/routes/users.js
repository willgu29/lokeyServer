var express = require('express');
var router = express.Router();
var User = require("./Models/User.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  var query = User.find({}).limit(req.body.limit).skip(req.body.skip);
  query.select('-password -phoneNumber');
  query.exec(function (err, users) {
    if (err) { console.log(err);} 
    else { res.json(users);}
  });
});

router.get("/:userID", function (req, res) {
  var searchID;
  if (req.params.userID == "me") {
    searchID = req.user._id;
  } else {
    searchID = req.params.userID;
  }

  var query = User.findOne({_id:searchID}).limit(req.body.limit).skip(req.body.skip);
  query.select('-password -phoneNumber');
  query.exec(function (err, user) {
    if (err) { console.log(err);} 
    else { res.json(user);}
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
