import http from 'http';
import assert from 'assert';
import config from '../src/config';

describe('Server', () => {

  const host = `http://${config.server.ip}:${config.server.port}`;

  it('host should return 200', done => {
    http.get(host, res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('/hello/all should return 200', done => {
    http.get(host + '/api/v1.x/hello', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('/user/me should return 401', done => {
    http.get(host + '/api/v1/user/me', res => {
      assert.equal(401, res.statusCode);
      done();
    });
  });

});
