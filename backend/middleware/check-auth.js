const jwt = require('jsonwebtoken');
const process = require('../nodemon.json');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
}