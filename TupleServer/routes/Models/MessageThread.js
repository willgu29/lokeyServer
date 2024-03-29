var mongoose = require('mongoose');


var messageThreadSchema = new mongoose.Schema({
	messageThread_id: mongoose.Schema.Types.ObjectId,  //as _id
	dateCreated: {type: Date, default: Date.now},
	dateLastUpdated: {type: Date, default: Date.now}, //last message sent
    participant_ids: [mongoose.Schema.Types.ObjectId], //add user_id as well (person who started)
    participant_fullNames: [String],
    participant_phoneNumbers: [Number]


});

module.exports = MessageThread = mongoose.model('MessageThread', messageThreadSchema);