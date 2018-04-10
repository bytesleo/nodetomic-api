import { result, notFound, error } from 'express-easy-helper';
import { emit } from '../sockets/example.socket';
import Example from '../models/example.model';

// List Example's
export function list(req, res) {

  return Example.find().exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res));
}

// Create a Example
export function create(req, res) {

  return Example.create(req.body)
    .then(result(res, 201))
    .catch(error(res));

}

// read a Example
export function read(req, res) {

  return Example.findById(req.params.id).exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res));

}

// Update a Example
export function update(req, res) {

  return Example.findByIdAndUpdate(
    req.params.id, {
      $set: {
        greet: req.body.greet,
        language: req.body.language,
      }
    }, {
      new: true
    }).exec()
    .then(notFound(res))
    .then(result(res))
    .catch(error(res))

}

// Destroy a Example
export function destroy(req, res) {

  return Example.deleteOne({
    _id: req.params.id
  }).exec()
    .then(result(res))
    .catch(error(res));

}

// Emit animation with socket!
export function animation(req, res) {
  try {
    emit('animation', req.params.id);
    return result(res, 'Socket emitted!');
  } catch (err) {
    return error(res, 'No client with event...');
  }
}
