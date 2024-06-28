const Comment = require('../models/commentModel');

exports.fetchAllComments = (req, res, next) => {
  Comment.find().populate('userId', 'name').exec().then(docs => {
    if (docs.length > 0) {
      const response = {
        count: docs.length,
        comments: docs.map(doc => {
          return {
            comment: doc.comment,
            userId: doc.userId,
            detailsRequest: {
              type: 'GET',
              url: 'http://localhost:3000/comments/' + doc._id
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

exports.fetchCommentById = (req, res, next) => {
  const id = req.params.commentId;
  Comment.findById(id).populate('userId', 'name').exec().then(doc => {
    if (doc) {
      console.log(doc);
      res.status(200).json(doc);
    } else {
      res.status(404).json({ message: 'No valid entry found for Id: ' + id });
    }
  });
}

exports.createComment = (req, res, next) => {
  const comment = new Comment({
    _id: new mongoose.Types.ObjectId(),
    rate: req.body.rate,
    message: req.body.message,
    userId: req.userData.userId,
    mediaId: req.params.mediaId
  });
  comment.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Comment created successfully',
      createdComment: {
        rate: result.rate,
        comment: result.comment,
        userId: result.userId,
        detailsRequest: {
          type: 'GET',
          url: 'http://localhost:3000/comments/' + result._id
        }
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.updateComment = (req, res, next) => {
  const id = req.params.commentId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Comment.update({ _id: id }, { $set: updateOps }).exec().then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Comment updated successfully',
      detailsRequest: {
        type: 'GET',
        url: 'http://localhost:3000/comments/' + id
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.deleteComment = (req, res, next) => {
  const id = req.params.commentId;
  Comment.remove({ _id: id }).exec().then(result => {
    res.status(200).json({
      message: 'Comment deleted successfully',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/comments',
        body: { comment: 'String', userId: 'String' }
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}