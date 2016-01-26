var express = require('express');
var router = express.Router();
var TuplerList = require("./Models/TuplerList.js");
var mongoose = require("mongoose");



// ** /tuplerLists

router.get("/", function (req, res) {
  console.log("/tuplerLists GET");

  var searchID = req.body.userID;

  //TODO: pass in tupleID to only get PRE/Current events
  TuplerList.find({peopleInvited_ids: searchID}, function (err, tuplerListObjects) {
    if (err) return console.error(err);
    res.json(tuplerListObjects);
  }).limit(req.body.limit).skip(req.body.skip);
});

router.post("/", function (req, res) {


});


module.exports = router;