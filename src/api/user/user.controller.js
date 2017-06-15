import User from './user.model';

export function list(req, res) {

  User.find({}, {
    password: 0
  }).exec().then(users => {
    res.json(users)
  }).catch(err => res.status(500).json({
    error: err
  }));

}

export function read(req, res) {

  User.findById(req.params.id, {
    password: 0,
    social: 0
  }).exec().then(result => {
    res.json(result);
  }).catch(err => res.status(500).json({
    error: err
  }));

}

export function create(req, res) {

  let create = new User();
  create.username = req.body.username;
  create.email = req.body.email;
  create.name = req.body.name;
  create.lastname = req.body.lastname;
  create.password = req.body.password;
  create.save().then(result => res.json({
    'created': true
  })).catch(err => res.status(500).json({
    error: err
  }))
}

export function update(req, res) {

  let idUser = req.user._id;

  User.findById(idUser).then(user => {

    try {
      user.username = req.body.username;
      user.email = req.body.email;
      user.name = req.body.name;
      user.lastname = req.body.lastname;
      if (req.body.password)
        user.password = req.body.password;

      user.save().then(result => res.json({
        update: true
      })).catch(err => res.status(500).json({
        error: err
      }));

    } catch (err) {
      res.status(500).json({
        error: err
      });
    }

  }).catch(err => res.status(500).json({
    error: err
  }));

}

export function updateByAdmin(req, res) {

  User.findById(req.params.id).then(user => {

    try {
      user.username = req.body.username;
      user.email = req.body.email;
      user.name = req.body.name;
      user.lastname = req.body.lastname;
      if (req.body.password)
        user.password = req.body.password;
      user.roles = req.body.roles || [];
      user.status = req.body.status;

      user.save().then(result =>
        res.json({
          update: true
        })).catch(err => res.status(500).json({
        error: err
      }));

    } catch (err) {
      res.status(500).json({
        error: err
      });
    }

  }).catch(err => res.status(500).json({
    error: err
  }));
}

export function remove(req, res) {

  User.deleteOne({
    _id: req.params.id
  }).then(result => {
    res.json(result);
  }).catch(err => res.status(500).json({
    error: err
  }));

}

export function me(req, res) {

  let user = req.user;
  user.ttl.available = user.ttl.assigned - Math.floor(((new Date().getTime()) -
    user.ttl.created) / 1000); //time session
  res.json(user);

}
