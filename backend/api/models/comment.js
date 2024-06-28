const mongoose = require('mongoose');

const commentSchema = mangoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rate: { type: Number, required: true },
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mediaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true }
});

module.exports = mongoose.model('Comment', commentSchema);
    