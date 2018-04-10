import { unauthorized, forbidden } from 'express-easy-helper';
import { has } from 'role-calc';
import { r } from '../../lib/redis-jwt';
import User from '../../api/models/user.model';

// VerifyToken
export function mw(requiredRoles) {

  return async (req, res, next) => {

    // Extract Token
    let token = req.headers["authorization"];

    if (token) {
      // Bearer
      req.headers.authorization = `Bearer ${token}`;

      // Verify Token with redis-jwt -> if you want to extract the data you should add true: r.verify(token, true);
      let session = await r.verify(token, true);
      if (!session)
        return next(forbidden(req.res));

      // Extract info user from MongoDB
      let _user = await User.findById(session.id).select('-social').exec();
      if (!_user)
        return next(unauthorized(req.res));

      // If id's not equals
      if (_user._id.toString() !== session.id.toString())
        return next(forbidden(req.res));

      // User is enabled?
      if (!_user.status)
        return next(unauthorized(req.res));

      // Verify Roles
      if (requiredRoles)
        if (!has(requiredRoles, _user.roles))
          return next(forbidden(req.res));

      // Success
      req.user = Object.assign({ session }, _user._doc);
      return next();
    } else {
      return next(forbidden(req.res));
    }
  }
}