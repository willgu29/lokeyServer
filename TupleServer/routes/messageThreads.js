var express = require('express');
var router = express.Router();
var MessageThread = require("./Models/MessageThread.js");
var mongoose = require("mongoose");

// ** /messageThreads

//Get thread details
router.get("/", function (req, res) {
  console.log("/messageThreads/");

  var searchID = req.body.threadID;

  MessageThread.findOne({_id:searchID}, function (err, threadObject) {
    if (err) return console.error(err);
    res.json(threadObject);
  });
});

//Create new message thread
router.post("/", function (req, res) {
  console.log("/messageThreads POST ");

  
   
        //Create it
    var newThread =new MessageThread({ participant_ids: req.body.participant_ids,
                              participant_fullNames: req.body.participant_fullNames,
                              participant_phoneNumbers: req.body.participant_phoneNumbers,
                              messageCount: 0});

   	newThread.save(function (err, newThread) {
        if (err) {
           console.error(err);
           return res.json({info: "There was an error. Please try again in a minute."});
        } else {
           console.log(newThread);
           return res.json(newThread);
        }
    });
     
});



module.exports = router;