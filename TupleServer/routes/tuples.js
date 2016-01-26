var express = require('express');
var router = express.Router();
var Tuple = require("./Models/Tuple.js");
var mongoose = require("mongoose");
// ** /tuples

router.get("/all", function (req, res) {
  console.log("/tuples/all GET");

  //TODO: Only get events from date xx and further
  Tuple.find({}, function (err, tupleObjects) {
    if (err) return console.error(err);
    res.json(tupleObjects);
  }).limit(req.body.limit).skip(req.body.skip);
});

router.get("/", function (req, res) {
  console.log("/tuples GET");

  //TODO: Only get events from date xx and further
  Tuple.find({loc: req.body.loc, status: "PRE"}, function (err, tupleObjects) {
    if (err) return console.error(err);
    res.json(tupleObjects);
  }).limit(req.body.limit).skip(req.body.skip);
});

router.post("/", function (req, res) {
  console.log("/tuples/ POST ");


    var TEST_ID = mongoose.Types.ObjectId('TEST');//'4edd40c86762e0fb12000003');
    //***** IMPORTANT: REPLACE WITH 

    var newTuple = new Tuple({
                            user_id: TEST_ID, //req.body.userID,
                            fullName: req.body.fullName,
                            description: req.body.description,
                            status: req.body.status,
                            loc: {
                              coordinates: [Number(req.body.longitude), Number(req.body.latitude)]
                            },
                            locationAddress: req.body.address,
                            locationPostalCode: req.body.postalCode,
                            tuplerList_id: TEST_ID,//req.body.tuplerListID,
                            messageThread_id: TEST_ID//req.body.messageThreadID
    });
    
    newTuple.save(function (err, newTuple) {
                if (err) {
                  console.error(err);
                  return res.json({error: "There was an error in creating the tuple. Please try again in a minute."});
                } else {
                  console.log(newTuple);
                  return res.json(newTuple);
                }
    });
});

module.exports = router;