import { result, notFound, error } from 'express-easy-helper';
import User from '../models/user.model';

// Create a user
export function create(req, res) {

  return User.create({
    username: req.body.username,
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  })
    .then(result(res, 201))
    .catch(error(res));

}

// Read a user
export function read(req, res) {

  return User.findOne({ username: req.params.username }, {
    social: 0
  }).select('-email')
    .exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res));

}

// Update user
export function update(req, res) {

  return User.findByIdAndUpdate(
    req.user._id, {
      $set: {
        username: req.body.username,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        photo: req.body.photo
      }
    }, {
      new: true,
      // req:req
    }).exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}

// Get current user
export function me(req, res) {

  let user = req.user;
  delete user.session.id;
  return result(res, user);

}

/*
* Administrator
*/

// List of user's
export function listAdmin(req, res) {

  return User.find({})
    .select('-social')
    .exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res));

}

// Update a user
export function updateAdmin(req, res) {

  return User.findByIdAndUpdate(
    req.params.id, {
      $set: {
        username: req.body.username,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        photo: req.body.photo,
        provider: req.body.provider,
        roles: req.body.roles,
        status: req.body.status,
      }
    }, {
      new: true
    }).exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}

// Destroy a user
export function destroyAdmin(req, res, next) {

  return User.findByIdAndRemove(
    req.params.id
  ).exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}