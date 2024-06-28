const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'moderator', 'admin'], required: true, default: 'user' },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: [] }],
});

module.exports = mongoose.model('User', userSchema);