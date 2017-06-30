import Hello from './hello.model';

export function list(req, res) {

  Hello.find().exec().then(greets => {
    res.json(greets);
  }).catch(err => {
    res.status(500).json({error:err});
  });
}

export function read(req, res) {

  Hello.findById(req.params.id).exec().then(result => {
    res.json(result);
  }).catch(err => {
    res.status(500).json({error:err});
  });

}

export function create(req, res) {

  let create = new Hello();

  create.greet = req.body.greet;
  create.language = req.body.language;

  create.save().then(result => {
    res.json(result);
  }).catch(err => {
    res.status(500).json({error:err});
  })

}

export function update(req, res) {

  Hello.findByIdAndUpdate(req.params.id, {
    $set: {
      greet: req.body.greet,
      language: req.body.language,
    }
  }, {
    new: true
  }).exec().then(result => {
    res.json(result);
  }).catch(err => {
    res.status(500).json({error:err});
  });

}

export function remove(req, res) {

  Hello.deleteOne({
    _id: req.params.id
  }).then(result => {
    res.json(result);
  }).catch(err => {
    res.status(500).json({error:err});
  });

}
