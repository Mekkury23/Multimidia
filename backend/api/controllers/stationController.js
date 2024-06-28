const Station = require('../models/stationModel');

exports.fetchAllStations = (req, res, next) => {
  Station.find().populate('userId', 'name').exec().then(docs => {
    if (docs.length > 0) {
      const response = {
        count: docs.length,
        stations: docs.map(doc => {
          return {
            name: doc.name,
            src: doc.src,
            country: doc.country,
            frequency: doc.frequency,
          }
        )
      };
      res.status(200).json(response);
    } else {
      res.status(200).json({ message: 'Empty set found' });
    }
  }
  ).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.fetchStationById = (req, res, next) => {
  const id = req.params.stationId;
  Station.findById(id).populate('userId', 'name').exec().then(doc => {
    if (doc) {
      console.log(doc);
      res.status(200).json(doc);
    } else {
      res.status(404).json({ message: 'No valid entry found for Id: ' + id });
    }
  }
  ).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.createStation = (req, res, next) => {
  const station = new Station({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    src: req.body.src,
    country: req.body.country,
    frequency: req.body.frequency
  });
  station.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Station created successfully',
      createdStation: {
        name: result.name,
        src: result.src,
        country: result.country,
        frequency: result.frequency,
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.updateStation = (req, res, next) => {
  const id = req.params.stationId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Station.update({ _id: id }, { $set: updateOps }).exec().then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Station updated successfully'
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.deleteStation = (req, res, next) => {
  const id = req.params.stationId;
  Station.remove({ _id: id }).exec().then(result => {
    res.status(200).json({
      message: 'Station deleted successfully'
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}