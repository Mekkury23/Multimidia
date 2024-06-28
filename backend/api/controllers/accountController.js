const User = require('../models/user');

exports.fetchAllAccounts = (req, res, next) => {
  User.find().exec().then(docs => {
    if (docs.length > 0) {
      const response = {
        count: docs.length,
        accounts: docs.map(doc => {
          return {
            name: doc.name,
            email: doc.email,
            role: doc.role,
            detailsRequest: {
              type: 'GET',
              url: 'http://localhost:3000/accounts/' + doc._id
            }
          }
        })
      };
      res.status(200).json(response);
    } else {
      res.status(200).json({ message: 'Empty set found' });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.fetchAccountById = (req, res, next) => {
  const id = req.params.accountId;
  User.findById(id).exec().then(doc => {
    if (doc) {
      console.log(doc);
      res.status(200).json(doc);
    } else {
      res.status(404).json({ message: 'No valid entry found for ID: ' + id});
    }
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.deleteAccount = (req, res, next) => {
  const id = req.params.accountId;
  User.deleteOne({ _id: id }).exec().then(result => {
    res.status(200).json({
      message: 'Account deleted',
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.updateAccount = (req, res, next) => {
  const id = req.params.accountId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.updateOne({ _id: req.params.accountId }, { $set: updateOps })
  .exec().then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Account updated',
      request: {
        type: 'GET',
        url: 'http://localhost:3000/accounts/' + id
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}