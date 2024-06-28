const express = require('express');
const router = express.Router();

router.get('/play:mediaID', (req, res, next) => {
  const id = req.params.mediaID;
  if (id === 'special') {
    res.status(200).json({
      message: 'You discovered the special ID',
      id: id
    });
  } else {
    res.status(200).json({
      message: 'You passed an ID',
    });
  }
});

module.exports = router;