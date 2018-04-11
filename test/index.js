/* global describe, it */

import http from 'http';
import assert from 'assert';
import request from 'request';
import config from '../src/config';

describe('/', () => {

  const host = `http://${config.server.ip}:${config.server.port}`;

  // Server Online
  it('host should return 200 (Server Online)', done => {
    http.get(host, res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  /* Greeting */

  // Create a new greeting
  let idGreeting = '';
  it('/api/example/greeting should return 201 (Create)', done => {

    let options = {
      method: 'POST',
      url: `${host}/api/example/greeting`,
      json: {
        "greet": "Hi testing",
        "language": "Testing"
      }
    };

    request(options, function (error, res, body) {
      if (error)
        throw new Error(error);
      idGreeting = body._id;
      assert.equal(201, res.statusCode);
      done();
    });

  });

  // Get the list of greetings
  it('/api/example/greeting should return 200 (All)', done => {
    http.get(`${host}/api/example/greeting`, res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  // Get a greeting for id
  it('/api/example/greeting should return 200 (Read)', done => {
    http.get(`${host}/api/example/greeting/${idGreeting}`, res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  // Update a greeting by id
  it('/api/example/greeting should return 200 (Update)', done => {

    let options = {
      method: 'PUT',
      url: `${host}/api/example/greeting/${idGreeting}`,
      json: {
        "greet": "Hi again testing",
        "language": "Testing two"
      }
    };
    request(options, function (error, res, body) {
      if (error)
        throw new Error(error);
      assert.equal(200, res.statusCode);
      done();
    });

  });

  // Delete a greeting by id
  it('/api/example/greeting should return 200 (Delete)', done => {
    let options = {
      method: 'DELETE',
      url: `${host}/api/example/greeting/${idGreeting}`
    };
    request(options, function (error, res, body) {
      if (error)
        throw new Error(error);
      assert.equal(200, res.statusCode);
      done();
    });
  });

  /* Authentication */

  // Test Middleware
  it('/api/user/me should return 403 (Forbidden)', done => {
    http.get(`${host}/api/user/me`, res => {
      assert.equal(403, res.statusCode);
      done();
    });
  });

  // Register with duplicate username
  it('/api/user should return 500 (Duplicate username)', done => {

    let options = {
      method: 'POST',
      url: `${host}/api/user`,
      json: {
        "username": "admin",
        "password": "123",
        "email": "example@example.com",
        "name": "Hello",
        "lastname": "World"
      }
    };

    request(options, function (error, res, body) {
      if (error)
        throw new Error(error);
      assert.equal(500, res.statusCode);
      done();
    });

  });

  // Login
  let token = '';
  it('/auth/local should return 200 (Login Success)', done => {

    let roles = ['admin', 'user'];
    let options = {
      method: 'POST',
      url: `${host}/auth/local`,
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {
        username: roles[Math.round(Math.random())],
        password: '123'
      }
    };
    request(options, function (error, res, body) {
      if (error)
        throw new Error(error);
      token = JSON.parse(body).token;
      assert.equal(200, res.statusCode);
      done();
    });

  });

  // Send Token 
  it('/api/user/me should return 200 (Test Token)', done => {

    let options = {
      method: 'GET',
      url: `${host}/api/user/me`,
      headers: {
        'authorization': `${token}`
      }
    };
    request(options, function (error, res, body) {
      if (error)
        throw new Error(error);
      assert.equal(200, res.statusCode);
      done();
    });
  });

  // Logout
  it('/auth/logout should return 200 (Logout)', done => {

    let options = {
      method: 'DELETE',
      url: `${host}/auth/logout`,
      headers: {
        'authorization': `${token}`
      }
    };
    request(options, function (error, res, body) {
      if (error)
        throw new Error(error);
      assert.equal(200, res.statusCode);
      done();
    });
  });

});
