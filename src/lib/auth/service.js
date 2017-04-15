import * as Redis from '../redis';
import * as Token from '../token';
import * as utility from '../utility';
import config from '../../config';

// Initialization token session with local and social networks
export function start(req, res, type) {
    //var user = req.user;
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

    const ttl = req.user.ttl || utility.getTimeRol(req.user.roles);

    Token.create(user._id).then(data => {

        if (!config.redis.token.multiple) { //delete all sessions tokens
            Redis.findByPattern(data.key);
        }

        Redis.set(data.key, ttl, user).then(result => {

            switch (type) {
                case 'local':
                    res.status(200).json({token: data.token, redirect: config.login.redirect});
                    break;
                case 'social':
                    res.cookie('token', JSON.stringify(data.token));
                    res.redirect(config.login.redirect);
                    break;
            }

        }).catch(err => res.status(500).send('Error creating redis' + err));

    }).catch(err => res.status(500).send('Error creating token' + err));

}
