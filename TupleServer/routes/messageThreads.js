var express = require('express');
var router = express.Router();
var MessageThread = require("./Models/MessageThread.js");

// ** /messageThreads

//Get thread details
router.get("/:threadID", function (req, res) {
  console.log("/messageThreads/:threadID" + req.params.threadID);
  MessageThread.findOne({_id:req.params.threadID}, function (err, threadObject) {
    if (err) return console.error(err);
    res.json(threadObject);
  });
});

//Create new message thread
router.post("/", function (req, res) {
  console.log("/messageThreads POST ");

    var startID = req.user._id;
    var clientOneFullName = req.user.fullName;
    var participantID = req.body._id;
    var clientTwoFullName = req.body.fullName;
    var participant_ids = [req.user._id];
    var participant_emails = [req.user.phoneNumber];
   
        //Create it
    var newThread =new MessageThread({ user_id: startID, 
                              fullName: clientOneFullName,
                              participant_ids: participant_ids,
                              participant_fullNames: [clientOneFullName, clientTwoFullName],
                              participant_emails: participant_emails,
                              messageCount: 0,
                              unseenMessagesCount: 0});

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