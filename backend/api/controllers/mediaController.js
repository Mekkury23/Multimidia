const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/png'
    || file.mimetype === 'video/mp4'
    || file.mimetype === 'audio/mpeg'
    || file.mimetype === 'audio/mp3'
    || file.mimetype === 'audio/wav'
    || file.mimetype === 'text/srt') {
    cb(null, true);
  } else {
    cb(new Error("Invalid File"), false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20
  },
  fileFilter: fileFilter
});

const fields = [
  { name: 'media', maxCount: 1 },
  { name: 'cover', maxCount: 1 }
];

const Media = require('../models/media');
const User = require('../models/user');

exports.fetchAllMedia = (req, res, next) => {
  Media.find().populate('userId', 'name').exec().then(docs => {
    if (docs.length > 0) {
      const response = {
        count: docs.length,
        medias: docs.map(doc => {
          return {
            // mediaType: doc.mediaType,
            cover: doc.cover,
            title: doc.title,
            author: doc.author,
            userId: doc.userId,
            detailsRequest: {
              type: 'GET',
              url: 'http://localhost:3000/media/' + doc._id
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

exports.fetchMediaById = (req, res, next) => {
  const id = req.params.mediaId;
  Media.findById(id).populate('userId', 'name').exec().then(doc => {
    if (doc) {
      console.log(doc);
      console.log(doc.cover);
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

exports.downloadMedia = (req, res, next) => {
  const id = req.params.mediaId;
  Media.findById(id).exec().then(doc => {
    if (doc) {
      console.log(doc.cover);
      const file = doc.cover; // sub cover with src
      const filename = doc.author + '-' + doc.title;
      fs.writeFile(filename, file, err => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: 'Error downloading file',
            error: err
          });
        } else {
          res.status(200).json({
            message: 'File downloaded'
          });
        }
      });
    } else {
      res.status(404).json({
        message: 'Media not found for Id: ' + id
      });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}

// form-data: title, author, file
exports.createMedia = (req, res, next) => {
  console.log(req.files.media[0].path);
  if (req.userData.userId.match(/^[0-9a-fA-F]{24}$/)) {
    User.findById(req.userData.userId).then(user => {
      if (!user) {
        return res.status(404).json({
          success: 0,
          message: 'User not found',
        });
      }
      // if(req.files.length >1)
      const media = new Media({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        userId: req.userData.userId,
        // coverURL: req.files.cover[1].path,
        mediaURL: req.files.media[0].path
      });
      res.status(201).json({
        message: 'Successfully created media',
        createdMedia: {
          title: media.title,
          author: media.author,
          userId: media.userId
        }
      });
      return media.save();
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });    
  } else {
    return res.status(500).json({
      success: 0,
      message: 'Invalid userId',
    });
  }
}

exports.updateMedia = (req, res, next) => {
  const id = req.params.mediaId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.updateOne({ _id: req.params.mediaId }, { $set: updateOps })
  .exec().then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Media updated',
      request: {
        type: 'GET',
        url: 'http://localhost:3000/media/' + id
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.deleteMedia = (req, res, next) => {
  const mediaId = req.params.mediaId;
  Media.deleteOne({ _id: mediaId }).exec().then(result => {
    res.status(200).json({
      message: 'Media deleted',
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}