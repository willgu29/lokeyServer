var mongoose = require('mongoose');

var tupleSchema = new mongoose.Schema({
	tuple_id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId, //person who started tuple
    fullName: String, //of person
	dateCreated: {type: Date, default: Date.now},
    loc: {
        type: {type: String, default: "Point"},
        coordinates: [Number] //[Longitude, latitude]
    },
    locationAddress: String, //11130 Roebling Avenue, Los Angeles, etc.
    locationPostalCode: String, //CA 90024, etc.
	description: String,
    startTime: String, //to be changed to Date later...
    endTime: String,
    status: Number, //1= PRE, 2= IN PROGRESS, 3= ENDED
    tuplerList_id: mongoose.Schema.Types.ObjectId,
    messageThread_id: mongoose.Schema.Types.ObjectId
   
   



});

tupleSchema.index({ loc: '2dsphere' });


module.exports = Tuple = mongoose.model('Tuple', tupleSchema);