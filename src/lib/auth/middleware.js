import * as Redis from '../redis';
import * as Token from '../token';
import * as utility from '../utility';

// Middleware
export function isAuthenticated(rolesRequired) {
  let self = this;
  return (req, res, next) => {

    try {

      let token = req.headers["authorization"];

      if (token !== undefined) {
        req.headers.authorization = `Bearer ${token}`;
      } else {
        return res.status(401).json({error:'Unauthorized: Not Token provided'});
      }

      Token.extract(token).then(decode => {

        Redis.get(decode.key).then(infoEncrypt => {

          let info = JSON.parse(utility.decrypt(infoEncrypt));

          if (decode.id !== info._id)
            return res.status(401).json({error:'Unauthorized: id not equals'});

          if (rolesRequired !== undefined)
            if (!self.hasRole(rolesRequired, info.roles))
              return res.status(403).json({error: 'Unauthorized role'});

          req.user = info;
          next();
        }).catch(err => {
          return res.status(401).json({error: 'Unauthorized: Token not found'});
        })

      }).catch(err => {
        return res.status(401).json({error: 'Unauthorized: Token Invalid'});
      })

    } catch (err) {
      return res.status(401).json({error: 'Unauthorized'});
    }
  }
}

// hasRole
export function hasRole(rolesRequired, rolesUser) {
  try {
    let isAuthorized = false;
    rolesRequired.forEach(rolReq => {
      rolesUser.forEach(RolUser => {
        if (rolReq === RolUser)
          isAuthorized = true;
        }
      );
    });
    return isAuthorized;
  } catch (err) {
    return false;
  }
}
