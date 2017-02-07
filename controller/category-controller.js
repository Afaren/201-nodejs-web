const Category = require('../model/category');

class CategoryController {

  getAll(req, res, next){
    Category.find({}, (err, docs)=> {
      if(err) {
        return next();
      }
      res.status(200).send(docs);
    });
  };
  getOne(req, res, next){
    Category.findById(req.params.id)
      .exec((err, doc)=> {
        if(!doc) {
          return res.sendStatus(404);
        }
        if(err) {
          return next();
        }
        res.status(200).send(doc);
      })
  };
  delete(req, res, next){
    Category.findByIdAndRemove(req.params.id, (err, doc)=> {
      if(err) {
        return next();
      }
      if(!doc) {
        return res.statusCode(404);
      }
      res.sendStatus(204);
    });
  };
  create(req, res, next){
    new Category(req.body).save((err, doc)=> {
        if(err) {
          return next();
        }
        res.status(201).send(`categories/${doc._id}`)
      }
    );
  };
  update(req, res, next){
    Category.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
      if(err) {
        return next();
      }
      res.status(200).send(`categories/${doc._id}`)
    })
  };

}

module.exports = CategoryController;