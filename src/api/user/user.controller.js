import User from './user.model';

export function all(req, res) {

  User.find({}, {
    password: 0
  }).exec().then(users => {
    res.json(users)
  }).catch(err => {
    res.status(500).json(err)
  });

}

export function me(req, res) {

  let user = req.user;
  user.ttl.available = user.ttl.assigned - Math.floor(((new Date().getTime()) -
    user.ttl.created) / 1000); //time session
  res.json(user);

}
