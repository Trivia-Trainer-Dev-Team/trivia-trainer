const request = require('supertest');

const User = require('../server/models/userModel.js');

const server = 'http://localhost:3000';

const mongoose = require('mongoose');

const url =
  'mongodb+srv://Fabrizzio:Knicksarenumber1!@cluster0.my2wym6.mongodb.net/';

beforeEach(async () => {
  await mongoose.connect(url);
  await User.deleteMany();
});
/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe('/questions/', () => {
  describe('GET', () => {
    it('responds with 200 status and app/json content type', async () =>
      request(server)
        .get('/questions/Sports')
        .expect('Content-Type', /application\/json/)
        .expect(200));

    it('responds with array of objects', async () => {
      const response = await request(server).get('/questions/Sports');
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});

describe('/users/', () => {
  describe('POST  /users/', () => {
    it('responds with 201 status and application/json content type', () => {
      const body = {
        username: 'test3',
        password: 'testpas3',
        name: 'shahmar3',
      };
      return request(server)
        .post('/users/')
        .send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(201);
    });
  });
  describe('GET /users/', () => {
    it('responds with 200 status and application/json content type', async () => {
      const body = {
        username: 'test3',
        password: 'testpas3',
        name: 'shahmar3',
      };
      const user = await request(server).post('/users/').send(body);
      return request(server)
        .get('/users/?username=test3&password=testpas3')
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });
    it('Server responds with object that contains usernamefield', async () => {
      const body = {
        username: 'test3',
        password: 'testpas3',
        name: 'shahmar3',
      };
      const user = await request(server).post('/users/').send(body);
      return request(server)
        .get('/users/?username=test3&password=testpas3')
        .expect(200)
        .then((res) => {
          expect(res.body.username).toEqual('test3');
        });
    });
  });
});
