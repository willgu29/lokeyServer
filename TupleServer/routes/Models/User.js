var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  phoneNumber: Number,
  password: String,
  firstName: String,
  lastName: String,
  fullName: String,
  avatarURL: String,
  dateCreated: {type: Date, default: Date.now},
  lastLoginDate: Date //if nil/NaN/undefined, etc , never logged in, else date
});



module.exports = User = mongoose.model('User', userSchema);