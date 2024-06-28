const Group = require('../models/groupModel');

exports.fetchAllGroups = (req, res, next) => {
  Group.find().exec().then(docs => {
    if (docs.length > 0) {
      const response = {
        count: docs.length,
        groups: docs.map(doc => {
          return {
            name: doc.name,
            description: doc.description,
            detailsRequest: {
              type: 'GET',
              url: 'http://localhost:3000/groups/' + doc._id
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

exports.fetchGroupById = (req, res, next) => {
  const id = req.params.groupId;
  Group.findById(id).exec().then(doc => {
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({ message: 'No valid entry found for Id: ' + id});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.createGroup = (req, res, next) => {
  const group = new Group({
    name: req.body.name,
    description: req.body.description
  });
  group.save().then(result => {
    res.status(201).json({
      message: 'Group created successfully',
      createdGroup: {
        name: result.name,
        description: result.description,
        detailsRequest: {
          type: 'GET',
          url: 'http://localhost:3000/groups/' + result._id
        }
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.updateGroup = (req, res, next) => {
  const id = req.params.groupId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Group.update({ _id: id }, { $set: updateOps }).exec().then(result => {
    res.status(200).json({
      message: 'Group updated',
      detailsRequest: {
        type: 'GET',
        url: 'http://localhost:3000/groups/' + id
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.deleteGroup = (req, res, next) => {
  const id = req.params.groupId;
  Group.remove({ _id: id }).exec().then(result => {
    res.status(200).json({
      message: 'Group deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/groups',
        body: { name: 'String', description: 'String' }
      }
    });
  }
  ).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}