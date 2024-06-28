const Category = require('../models/category');

exports.fetchAllCategories = (req, res, next) => {
  Category.find().exec().then(docs => {
    if (docs.length > 0) {
      const response = {
        count: docs.length,
        categories: docs.map(doc => {
          return {
            name: doc.name,
            description: doc.description,
            tags: doc.tags,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/categories/' + doc._id
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

exports.fetchCategoryById = (req, res, next) => {
  const id = req.params.categoryId;
  Category.findById(id).exec().then(doc => {
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

exports.createCategory = (req, res, next) => {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags
  });
  category.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Created category successfully',
      createdCategory: {
        name: result.name,
        description: result.description,
        tags: result.tags,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/categories/' + result._id
        }
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.updateCategory = (req, res, next) => {
  const id = req.params.categoryId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Category.update({ _id: id }, { $set: updateOps }).exec().then(result => {
    res.status(200).json({
      message: 'Category updated',
      request: {
        type: 'GET',
        url: 'http://localhost:3000/categories/' + id
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}

exports.deleteCategory = (req, res, next) => {
  const id = req.params.categoryId;
  Category.remove({ _id: id }).exec().then(result => {
    res.status(200).json({
      message: 'Category deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/categories',
        body: { name: 'String', description: 'String', tags: 'Array' }
      }
    });
  }
  ).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}