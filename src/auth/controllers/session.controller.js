import { result, notFound, error } from 'express-easy-helper';
import { call } from '../../lib/redis-jwt';

// List of sessions by user
export function list(req, res) {

  return call.getValuesByPattern(req.user._id)
    .then(notFound(res))
    .then(all => {
      for (let prop in all)
        all[prop] = JSON.parse(all[prop]);
      return result(res, all);
    })
    .catch(error(res))

}

// Destroy a session
export function destroy(req, res) {

  return call.destroy(`${req.user._id}:${req.params.id.split(":")[1]}`)
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}

// Destroy a current session
export function logout(req, res) {

  console.log(req.user.session.rjwt)
  return call.destroy(req.user.session.rjwt)
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}

/* Administrator */

// List of sessions by id
export function listAdmin(req, res) {

  return call.getValuesByPattern(req.params.id)
    .then(notFound(res))
    .then(all => {
      for (let prop in all)
        all[prop] = JSON.parse(all[prop]);
      return result(res, all);
    })
    .catch(error(res))

}

// Destroy a session by rjwt
export function destroyAdmin(req, res) {

  return call.destroy(`${req.params.id}`)
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}

// Logout a user by id
export function logoutAdmin(req, res) {

  return call.destroyMultiple(req.params.id)
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}