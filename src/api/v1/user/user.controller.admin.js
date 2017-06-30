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

export function update(req, res) {

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
