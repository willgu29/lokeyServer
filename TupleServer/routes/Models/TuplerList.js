var mongoose = require("mongoose");

var tuplerListSchema = new mongoose.Schema({
	tuplerlist_id: mongoose.Schema.Types.ObjectId,
	dateCreated: {type: Date, default: Date.now},
    peopleInvited_fullNames: [String],
    peopleInvited_ids: [mongoose.Schema.Types.ObjectId],
    peopleInterested_fullNames: [String],
    peopleInterested_ids: [mongoose.Schema.Types.ObjectId],
    peopleAttending_fullNames: [String],
    peopleAttending_ids: [mongoose.Schema.Types.ObjectId],
    peopleAttending_status: [Number] // 0 == attending, 1 == OTW, 2 == Arrived, 3 = left
   



});

module.exports = TuplerList = mongoose.model('TuplerList', tuplerListSchema);