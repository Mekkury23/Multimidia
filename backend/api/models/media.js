const mongoose = require('mongoose');

const mediaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  mediaType: { type: String, required: false },
  title: { type: String, required: true },
  description: { type: String, required: false },
  author: { type: String, required: true },
  uploadDate: { type: Date, required: true, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, required: false, default: []}],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
  coverURL: { type: String, required: false },
  mediaURL: { type: String, required: true },
});

module.exports = mongoose.model('Media', mediaSchema);