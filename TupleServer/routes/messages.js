var express = require('express');
var router = express.Router();
var Message = require("./Models/Message.js");

// ** messages //


//Get all messages in messageThread
router.get("/:convoID", function (req, res) {
  console.log("/messages/:convoID GET " + req.params.convoID);
  var searchID;
  // if (req.params.userID == "me") {
  //   searchID = req.user._id;
  // } else {
    searchID = req.params.convoID;
  // }

  //sort by date created (does this by default)
  Message.find({toMessageThread_id:searchID}, function (err, messageObjects) {
                if (err) {return console.error(err);}
                else {
                  res.json(messageObjects);
                }
  }).limit(req.body.limit).skip(req.body.skip);
});


router.post("/:convoID", function (req, res) {
  console.log("/messages/:convoID POST", req.params.convoID);

  var convoID = req.params.convoID;
    var ObjectId = require('mongoose').Types.ObjectId; 
    var query = { "_id" : new ObjectId(convoID)};
    MessageThread.findOne(query, function (err, thread) {
      if (err){console.log(err);}
      else {
          if (thread.messageCount == null){
            thread.messageCount = 1;
          } else {
            thread.messageCount++;
          }
          console.log("Message count: ", thread.messageCount);
        thread.save(function (err, thread) {

        });   
      }
     
    });  

  var newMessage = new Message({
                          user_id: req.user._id,
                          fullName: req.user.fullName,
                          text: req.body.text,
                          toMessageThread_id: convoID});

  newMessage.save(function (err, newMessage) {
     if (err) {console.error(err); return res.json({info: 
      "There was an error. Please try again in a minute."});
      } else { console.log(newMessage); return res.json({info:
       "success", _id: newMessage._id});}
    });




});


module.exports = router;