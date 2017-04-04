import http from 'http';
import assert from 'assert';
import config from '../server/config';

describe('Server', () => {

    var host = 'http://' + config.ip + ':' + config.port;

    it('should return 200', done => {
        http.get(host, res => {
            assert.equal(200, res.statusCode);
            done();
        });
    });
    it('Hello should return 200', done => {
        http.get(host + '/api/hello/index', res => {
            assert.equal(200, res.statusCode);
            done();
        });
    });
});
