const request = require('supertest');
const app = require('../');
const {assert} = require('chai');
const {jsdom} = require('jsdom');

describe('GET /users', function () {
    it('respond with json containing a list of all users, (name, email)', function (done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
describe('GET /users/:id', function () {
    it('respond with json containing a single user', function (done) {
        request(app)
            .get('/users/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
describe('GET /users/:id', function () {
    it('respond with json user not found', function (done) {
        request(app)
            .get('/users/idnotfound')
            .set('Accept', 'application/json')
            //.expect('Content-Type', /text/)
            .expect(404) //expecting HTTP status code
            .expect("user not found") // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

