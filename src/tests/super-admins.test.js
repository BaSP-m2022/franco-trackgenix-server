/* eslint-disable no-useless-escape */
import request from 'supertest';
import SuperAdmins from '../models/Super-admins';
import superAdminsSeed from '../seeds/super-admins';
import app from '../app';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdminsSeed);
});

const superAdminId = '246c3e8616a6374cae43b660';
const NotFoundId = '246c4a8612a6374caa43b662';

describe('GET /super-admins', () => {
  test('It should get super admins list', async () => {
    const response = await request(app).get('/super-admins');
    expect(response.body.message).toBe('Super Admins found successfully');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });

  test('It should get super admins with first name Simon', async () => {
    const response = await request(app).get('/super-admins?firstName=Simon');
    expect(response.body.message).toBe('Super Admins found successfully');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });

  test('It should return status 404', async () => {
    const response = await request(app).get('/super-admins?firstName=Simona');
    expect(response.body.message).toBe('Super Admins not found');
    expect(response.statusCode).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBe(true);
  });
});

describe('GET by id /super-admins/:id', () => {
  test('It should get super admin by id', async () => {
    const response = await request(app).get(`/super-admins/${superAdminId}`);
    expect(response.body.message).toBe('Super Admin found successfully');
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBe(false);
  });

  test('It should return status 404 (not found id)', async () => {
    const response = await request(app).get(`/super-admins/${NotFoundId}`);
    expect(response.body.message).toBe('Super Admin not found, invalid ID');
    expect(response.statusCode).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBe(true);
  });

  test('It should return status 500 (invalid id)', async () => {
    const response = await request(app).get('/super-admins/22');
    expect(response.body.message).toBe('Cast to ObjectId failed for value \"22\" (type string) at path \"_id\" for model \"SuperAdmin\"');
    expect(response.statusCode).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBe(true);
  });
});

describe('POST /super-admins', () => {
  test('It should create new super admin', async () => {
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

  test('It should return status 400 (empty body)', async () => {
    const response = await request(app).post('/super-admins').send({});
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('It should return status 400 (different key)', async () => {
    const response = await request(app).post('/super-admins').send({
      dni: 123456789,
      email: 'mainline2@carkannino.com',
      firstName: 'Marcos',
      lastName: 'Kannino',
    });
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('It should return status 400 (empty password)', async () => {
    const response = await request(app).post('/super-admins').send({
      password: '',
      email: 'mainline2@carkannino.com',
      firstName: 'Marcos',
      lastName: 'Kannino',
    });
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('It should return status 400 (empty email)', async () => {
    const response = await request(app).post('/super-admins').send({
      password: '1e4c62d434',
      email: '',
      firstName: 'Marcos',
      lastName: 'Kannino',
    });
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('It should return status 400 (empty first name)', async () => {
    const response = await request(app).post('/super-admins').send({
      password: '1e4c62d434',
      email: 'mainline2@carkannino.com',
      firstName: '',
      lastName: 'Kannino',
    });
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('It should return status 400 (empty last name)', async () => {
    const response = await request(app).post('/super-admins').send({
      password: '1e4c62d434',
      email: 'mainline2@carkannino.com',
      firstName: 'Marcos',
      lastName: '',
    });
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
});

describe('PUT /super-admins/:id', () => {
  test('It should edit a super admin', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({
      password: '1e4c62d4c4',
      email: 'teffuedita2@carkannino.com',
      firstName: 'Teffu',
      lastName: 'Isteditado',
    });
    expect(response.body.message).toBeDefined();
    expect(response.body.data).not.toBe(undefined);
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });

  test('It should return status 404 (not found id)', async () => {
    const response = await request(app).put(`/super-admins/${NotFoundId}`).send({
      password: '1e4c62d4c4',
      email: 'teffuedita2@carkannino.com',
      firstName: 'Teffu',
      lastName: 'Isteditado',
    });
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
  });

  test('It should return status 400 (empty body)', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({});
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('It should return status 400 (different key)', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({
      dni: 123456789,
      email: 'mainline2@carkannino.com',
      firstName: 'Marcos',
      lastName: 'Kannino',
    });
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('It should return status 400 (empty password)', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({
      password: '',
      email: 'mainline2@carkannino.com',
      firstName: 'Marcos',
      lastName: 'Kannino',
    });
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('It should return status 400 (empty email)', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({
      password: '1e4c62d434',
      email: '',
      firstName: 'Marcos',
      lastName: 'Kannino',
    });
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('It should return status 400 (empty first name)', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({
      password: '1e4c62d434',
      email: 'mainline2@carkannino.com',
      firstName: '',
      lastName: 'Kannino',
    });
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });

  test('It should return status 400 (empty last name)', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({
      password: '1e4c62d434',
      email: 'mainline2@carkannino.com',
      firstName: 'Marcos',
      lastName: '',
    });
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
});

describe('DELETE /super-admins/:id', () => {
  test('delete super admin', async () => {
    const response = await request(app).delete(`/super-admins/${superAdminId}`);
    expect(response.body.message).toBe('Super Admin deleted successfully');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });

  test('It should return status 404 (not found id)', async () => {
    const response = await request(app).delete(`/super-admins/${NotFoundId}`);
    expect(response.body.message).toBe('Super Admin not found');
    expect(response.statusCode).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBe(true);
  });

  test('It should return status 500 (invalid id)', async () => {
    const response = await request(app).delete('/super-admins/22');
    expect(response.body.message).toBe('Cast to ObjectId failed for value \"22\" (type string) at path \"_id\" for model \"SuperAdmin\"');
    expect(response.statusCode).toBe(500);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBe(true);
  });

  test('It should return status 404', async () => {
    const response = await request(app).get(`/super-admins/${superAdminId}`);
    expect(response.body.message).toBe('Super Admin not found, invalid ID');
    expect(response.statusCode).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBe(true);
  });
});
