const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: Array, required: true }]
});

module.exports = mongoose.model('Category', categorySchema);