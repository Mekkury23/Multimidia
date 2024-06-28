const express = require('express');
const router = express.Router();

const StationController = require('../controllers/stationController');

router.get('/', StationController.fetchAllStations);

router.get('/:stationId', StationController.fetchStationById);

router.post('/', StationController.createStation);

router.patch('/:stationId', StationController.updateStation);

router.delete('/:stationId', StationController.deleteStation);