import request from 'supertest';
import SuperAdmins from '../models/Super-admins';
import superAdminsSeed from '../seeds/super-admins';
import app from '../app';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdminsSeed);
});

const superAdminId = '246c3e8616a6374cae43b660';

describe('GET /super-admins', () => {
  test('get super admins list', async () => {
    const response = await request(app).get('/super-admins');
    expect(response.body.message).toBe('Super Admins found successfully');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
});

describe('GET by id /super-admins/:id', () => {
  test('get super admin by id ', async () => {
    const response = await request(app).get(`/super-admins/${superAdminId}`);
    expect(response.body.message).toBe('Super Admin found successfully');
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBe(false);
  });
});

describe('POST /super-admins', () => {
  test('create super admin', async () => {
    const response = await request(app).post('/super-admins').send({
      password: '1e4c62d434',
      email: 'mainline2@carkannino.com',
      firstName: 'Marcos',
      lastName: 'Kannino',
    });
    expect(response.body.message).toBe('Super Admin added to database');
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(false);
  });
});

describe('PUT /super-admins/:id', () => {
  test('edit super admin', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({
      password: '1e4c62d4c4',
      email: 'teffuedita2@carkannino.com',
      firstName: 'Teffu',
      lastName: 'Isteditado',
    });
    expect(response.body.message).toBe('Super Admin edited successfully');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });
});

describe('DELETE /super-admins/:id', () => {
  test('delete super admin', async () => {
    const response = await request(app).delete(`/super-admins/${superAdminId}`);
    expect(response.body.message).toBe('Super Admin deleted successfully');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });
});
