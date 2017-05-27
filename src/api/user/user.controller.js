import User from './user.model';

export function list(req, res) {

  User.find({}, {
    password: 0
  }).exec().then(users => {
    res.json(users)
  }).catch(err => res.status(500).json({error:err}));

}

export function read(req, res) {

  User.findById(req.params.id, {
    password: 0,
    social: 0
  }).exec().then(result => {
    res.json(result);
  }).catch(err => res.status(500).json({error:err}));

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
    })).catch(err => res.status(500).json({error:err}))
}

export function update(req, res) {

  User.findByIdAndUpdate(req.params.id, {
    $set: {
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      lastname: req.body.lastname,
      password: req.body.password
    }
  }, {
    new: true
  }).exec().then(result => {
    res.json(result);
  }).catch(err => res.status(500).json({error:err}));

}

export function updateByAdmin(req, res) {

}

export function remove(req, res) {

  User.deleteOne({
    _id: req.params.id
  }).then(result => {
    res.json(result);
  }).catch(err => res.status(500).json({error:err}));

}

export function me(req, res) {

  let user = req.user;
  user.ttl.available = user.ttl.assigned - Math.floor(((new Date().getTime()) -
    user.ttl.created) / 1000); //time session
  res.json(user);

}
