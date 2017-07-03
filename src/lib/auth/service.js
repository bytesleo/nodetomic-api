import * as Redis from '../redis';
import * as Token from '../token';
import * as utility from '../utility';
import config from '../../config';

// Initialization token session with local and social networks
export function start(req, res, type) {

  // In this point exists var req.user;
  // Set data to save in redis
  const user = {
    _id: req.user._id,
    name: req.user.name,
    username: req.user.username,
    email: req.user.email,
    provider: req.user.provider,
    photo: req.user.photo,
    status: req.user.status,
    roles: req.user.roles
  };

  // Calculate time by rol
  const ttl = req.user.ttl || utility.getTimeRol(req.user.roles) || config.redis.token.time;

  try {

    Token.create(user._id).then(token => {

      // If config.redis.token.multiple is false then all sessions associated with that user are removed
      if (!config.redis.token.multiple)
        Redis.findAndRemoveById(token.key);

      Redis.set(token.key, ttl, user).then(result => {

        switch (type) {
          case 'local':
            res.json({token: token.value});
            break;
          case 'social':
            res.cookie('token', JSON.stringify(token.value));
            res.redirect('/');
            break;
        }

      }).catch(err => {
        res.status(500).json({'error': 'Error creating redis'});
      });

    }).catch(err => {
      res.status(500).json({'error': 'Error creating redis'});
    });

  } catch (err) {
    res.status(500).json({'error': err});
  }

}
