import User from './user.model';

export function all(req, res) {

  User
    .find({}, {password: 0})
    .exec()
    .then(users => {
      return res.status(200).json(users)
    }).catch(err => {
      return res.status(500).json(err)
    });

}

export function me(req, res) {

  const user = req.user;
  user.ttl.available = user.ttl.assigned - Math.floor(((new Date().getTime()) - user.ttl.created) / 1000); //time session
  return res.status(200).json(user);

}
