var mongoose = require('mongoose');

var tupleSchema = new mongoose.Schema({
	tuple_id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId, //person who started tuple
    fullName: String, //of person
	dateCreated: {type: Date, default: Date.now},
    loc: {
        type: String,
        default: "Point",
        coordinates: [Number], //[Longitude, latitude]
        index: "2dsphere"
    },
    locationAddress: String, //11130 Roebling Avenue, Los Angeles, etc.
    locationPostalCode: String, //CA 90024, etc.
	name: String, //of tuple
	description: String,
    startTime: String, //to be changed to Date later...
    endTime: String,
    status: String, //PRE, IN PROGRESS, ENDED
    tuplerList_id: mongoose.Schema.Types.ObjectId,
    messageThread_id: mongoose.Schema.Types.ObjectId
   
   



});

module.exports = Tuple = mongoose.model('Tuple', tupleSchema);