'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelizeDatabase } = require('../src/auth/models');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('API Server', () => {
  it('should be able to create a new user', async () => {
    let response = await request.post('/signup').send({
      username: 'test',
      password: 'test',
    });
    expect(response.body.username).toEqual('test');
  });
});
