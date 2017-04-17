import * as Redis from '../redis';
import * as Token from '../token';
import * as utility from '../utility';

// Middleware
export function isAuthenticated(rolesRequired) {
  var self = this;
  return function(req, res, next) {

    try {
      let [type,
        token] = req.headers["authorization"].split(" ");

      if (type !== 'Bearer')
        return res.status(403).send('Type Authorization invalid');

      Token.extract(token).then(decode => {

        Redis.get(decode.key).then(info => {

          var info = JSON.parse(utility.decrypt(info));

          if (decode.id !== info._id)
            return res.status(401).send('Unauthorized: id not equals');

          if (rolesRequired !== undefined)
            if (!self.hasRole(rolesRequired, info.roles))
              return res.status(403).send('Rol Unauthorized');

          req.user = info;
          next();
        }).catch(err => {
          return res.status(401).send('Unauthorized Token not found');
        })

      }).catch(err => {
        return res.status(401).send('Unauthorized Token Invalid');
      })

    } catch (err) {
      return res.status(401).send('Unauthorized');
    }
  }
}

// hasRole
export function hasRole(rolesRequired, rolesUser) {
  try {
    let isAuthorized = false;
    rolesRequired.forEach(rolReq => {
      rolesUser.forEach(RolUser => {
        if (rolReq === RolUser) {
          isAuthorized = true;
        }
      });
    });
    return isAuthorized;
  } catch (err) {
    return false;
  }
}
