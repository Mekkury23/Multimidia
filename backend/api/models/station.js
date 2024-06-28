const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  src: { type: String, required: true },
  country: { type: String, required: true },
  frequency: { type: String, required: true }
});

module.exports = mongoose.model('Station', stationSchema);