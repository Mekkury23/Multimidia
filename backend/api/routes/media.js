const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');
const checkRole = require('../../middleware/check-role');

const MediaController = require('../controllers/mediaController');

// check for user role
router.get('/', checkAuth, MediaController.fetchAllMedia);

router.get('/:mediaId', checkAuth, MediaController.fetchMediaById);

router.get('/download/:mediaId', checkAuth, MediaController.downloadMedia);

// form-data: title, author, file
router.post('/', checkAuth, upload.fields(fields), MediaController.createMedia);

router.patch('/:mediaId', MediaController.updateMedia);

router.delete('/:mediaId', MediaController.deleteMedia);

module.exports = router;