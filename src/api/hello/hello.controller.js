import Hello from './hello.model';

export function all(req, res) {

  Hello.find({}).exec().then(greets => {
    res.json(greets);
  }).catch(err => {
    res.status(500).json(err);
  });

}

export function read(req, res) {

  Hello.findOne({_id: req.params.id}).exec().then(result => {
    res.json(result);
  }).catch(err => {
    res.status(500).json(err);
  });

}

export function create(req, res) {

  let newHello = new Hello();

  newHello.greet = req.body.greet;
  newHello.language = req.body.language;

  newHello.save().then(result => {
    res.json(result);
  }).catch(err => {
    res.status(500).json(err);
  })

}

export function update(req, res) {

  Hello.findOne({_id: req.params.id}).exec().then(result => {

    result.greet = req.body.greet;
    result.language = req.body.language;

    result.save().then(result => {
      res.json(result);
    }).catch(err => {
      res.status(500).json(err);
    })
  }).catch(err => {
    res.status(500).json(err);
  });

}

export function remove(req, res) {

  Hello.deleteOne({_id: req.params.id}).then(result => {
    res.json(result);
  }).catch(err => {
    res.status(500).json(err);
  });

}
