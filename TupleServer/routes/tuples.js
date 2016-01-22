var express = require('express');
var router = express.Router();
var Tuple = require("./Models/Tuple.js");

// ** /tuples

router.get("/all", function (req, res) {
  console.log("/tuples/all GET");

  //TODO: Only get events from date xx and further
  Tuple.find({}, function (err, tupleObjects) {
    if (err) return console.error(err);
    res.json(eventObjects);
  }).limit(req.body.limit).skip(req.body.skip);
});

router.get("/", function (req, res) {
  console.log("/tuples GET");

  //TODO: Only get events from date xx and further
  Tuple.find({peopleInvited_ids: req.user._id, status: "PRE"}, function (err, tupleObjects) {
    if (err) return console.error(err);
    res.json(eventObjects);
  }).limit(req.body.limit).skip(req.body.skip);
});

router.post("/", function (req, res) {
  console.log("/tuples/ POST ");

    var newTuple = new Tuple({
                            name: req.body.name,
                            description: req.body.description,
                            startTime: req.body.startTime,
                            endTime: req.body.endTime,
                            status: "PRE",
                            peopleInvited_fullNames: peopleInGroup_fullNames,
                            peopleInvited_ids: peopleInGroup_ids
    });

    newTuple.save(function (err, newTuple) {
                if (err) {
                  console.error(err);
                  return res.send("There was an error in creating the event. Please try again in a minute.");
                } else {
                  return res.json(newEvent);
                }
    });
});

module.exports = router;