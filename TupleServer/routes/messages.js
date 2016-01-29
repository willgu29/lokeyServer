var express = require('express');
var router = express.Router();
var MessageThread = require("./Models/MessageThread.js");
var Message = require("./Models/Message.js");
var mongoose = require("mongoose");

// ** /api/messages //


//Get all messages in messageThread
router.get("/", function (req, res) {
  console.log("/messages/ GET");
  var searchID;
  // if (req.params.userID == "me") {
  //   searchID = req.user._id;
  // } else {
    searchID = req.body.threadID;
  // }
  var TEST_ID = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
  console.log("That body: ",req.query.threadID);
  //sort by date created (does this by default)
  Message.find({toMessageThread_id:TEST_ID}, function (err, messageObjects) {
                if (err) {return res.json(err);}
                else {
                  res.json(messageObjects);
                }
  }).limit(req.body.limit).skip(req.body.skip);
});


router.post("/", function (req, res) {

    var TEST_ID = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

    var convoID = req.body.threadID;
    var ObjectId = require('mongoose').Types.ObjectId; 
    var query = { "_id" : new ObjectId(TEST_ID)};
    MessageThread.findOne(query, function (err, thread) {
      if (err){console.log(err);}
      else {
          if (thread == null) {
            return;
          }
          thread.dateLastUpdated = new Date();

          console.log("Message count: ", thread.messageCount);
        thread.save(function (err, thread) {

        });   
      }
     
    });  

  var newMessage = new Message({
                          user_id: TEST_ID,
                          fullName: req.body.fullName,
                          text: req.body.text,
                          toMessageThread_id: TEST_ID});

  newMessage.save(function (err, newMessage) {
     if (err) {console.error(err); return res.json({info: 
      "There was an error. Please try again in a minute."});
      } else { console.log(newMessage); return res.json({info:
       "success", _id: newMessage._id});}
    });




});


module.exports = router;