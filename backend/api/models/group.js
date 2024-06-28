const mongoose = require('mongoose')

const groupSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: [] }],
});

module.exports = mongoose.model('Group', groupSchema);