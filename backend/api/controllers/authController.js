const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.forgotPwd = (req, res, next) => {
  res.status(201).json({
    message: 'Forgot Password'
  });
}

exports.register = (req, res, next) => {
  if (req.body.email.includes('@isptec.co.ao')) {
    User.find({ email: req.body.email }).exec().then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Email already exists'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
              role: req.body.role
            });
            user.save().then(result => {
              console.log(result);
              res.status(201).json({
                message: 'Successfully created account',
                registedUser: {
                  name: result.name,
                  email: result.email,
                }
              });
            }).catch(err => {
              console.log(err);
              return res.status(500).json({
                error: err
              });
            });
          }
        });
      }
    }).catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
  } else {
    res.status(500).json({
      message: 'Invalid email'
    });
  }
}

exports.login = (req, res, next) => {
  User.find({ email: req.body.email }).exec().then(user => {
    if (user.length < 1) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id,
            role: user[0].role
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h'
          }
        );
        return res.status(200).json({
          message: 'Auth successful',
          token: token
        });
      }
      res.status(401).json({
        message: 'Auth failed'
      });
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}

exports.logout = (req, res, next) => {
  res.status(201).json({
    message: 'Logout'
  });
}