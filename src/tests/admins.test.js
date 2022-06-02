import request from 'supertest';
import Admin from '../models/Admins';
import adminsSeeds from '../seeds/admins';
import app from '../app';

beforeAll(async () => {
  await Admin.collection.insertMany(adminsSeeds);
});

const adminId = '628a57b3f17eaeca60f6a204';

describe('GET /admins', () => {
  test('It should get the admin list', async () => {
    const response = await request(app).get('/admins');
    expect(response.body.message).toBe('Showing the complete list of admins.');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
  test('It should get status 404', async () => {
    const response = await request(app).get('/admins?firstName=ThisIsNotAName');
    expect(response.body.message).toBe('Cannot show the list of admins.');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
  });
  test('It should get an array of two objects', async () => {
    const response = await request(app).get('/admins?firstName=Alejo');
    expect(response.body.message).toBe('Showing the complete list of admins.');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
  test('It should get an array of one objects', async () => {
    const response = await request(app).get('/admins?firstName=Bruno');
    expect(response.body.message).toBe('Showing the complete list of admins.');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
});
describe('GET /:id', () => {
  test('It should get the admin whit the ID required', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.body.message).toBe('Showing the specified admin by the id of 628a57b3f17eaeca60f6a204.');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });
  test('It should return a status 404', async () => {
    const response = await request(app).get('/admins/528a57ba5551e9d944cdb93a').send();
    expect(response.body.message).toBe('Could not found an admin by the id of 528a57ba5551e9d944cdb93a.');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
  });
  test('It should return a status 500', async () => {
    const response = await request(app).get('/admins/500').send();
    expect(response.body.message).toBe('Could not found an admin by the id of 500.');
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe(true);
  });
});
describe('PUT /admins', () => {
  test('It should get status 200', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Lionel',
      lastName: 'Messi',
      email: 'liomessi@gmail.com',
      password: 'LaPulga10',
    });
    expect(response.body.message).toBe('Admin updated');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });
  test('It should get status 400 and firstName empty', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: '',
      lastName: 'Messi',
      email: 'liomessi@gmail.com',
      password: 'LaPulga10',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should get status 400 and lastName incorrect', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Lionel',
      lastName: 'ME',
      email: 'liomessi@gmail.com',
      password: 'LaPulga10',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should get status 400 and email empty', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Lionel',
      lastName: 'Messi',
      email: '',
      password: 'LaPulga10',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should get status 400 and password empty', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Lionel',
      lastName: 'Messi',
      email: 'liomessi@gmail.com',
      password: '',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
});
describe('DELETE /admins/:id', () => {
  test('It should delete admin', async () => {
    const response = await request(app).delete(`/admins/${adminId}`).send();
    expect(response.body.message).toBe('Admin by the id of 628a57b3f17eaeca60f6a204 deleted successfully.');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data).toEqual(expect.anything());
  });
  test('It should return status 404', async () => {
    const response = await request(app).delete('/admins/628a57ba5551e9d944cdb931').send();
    expect(response.body.message).toBe('No admin with the id of 628a57ba5551e9d944cdb931.');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
  });
  test('It should return status 500', async () => {
    const response = await request(app).delete('/admins/500').send();
    expect(response.body.message).toBe('There was an error, please try again.');
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe(true);
  });
  test('It should return a status 404', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.body.message).toBe('Could not found an admin by the id of 628a57b3f17eaeca60f6a204.');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
});

describe('POST /', () => {
  test('It should delete admin', async () => {
    const response = await request(app).post('/admins/').send({
      firstName: 'Franco',
      lastName: 'Marini',
      email: 'francomarini@gmail.com',
      password: 'FrancoM2022',
    });
    expect(response.body.message).toBe('Admin created successfully.');
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(false);
  });
  test('It should return an error about the keys (firstName => name)', async () => {
    const response = await request(app).post('/admins/').send({
      name: 'Franco',
      lastName: 'Marini',
      email: 'francomarini@gmail.com',
      password: 'FrancoM2022',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should return an error about the keys (firstName < 3)', async () => {
    const response = await request(app).post('/admins/').send({
      firstName: 'Fr',
      lastName: 'Marini',
      email: 'francomarini@gmail.com',
      password: 'FrancoM2022',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should return an error about the keys (email)', async () => {
    const response = await request(app).post('/admins/').send({
      firstName: 'Franco',
      lastName: 'Marini',
      email: 'franco marini@gmailcom',
      password: 'FrancoM2022',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should return an error about the keys (password)', async () => {
    const response = await request(app).post('/admins/').send({
      firstName: 'Franco',
      lastName: 'Marini',
      email: 'francomarini@gmail.com',
      password: 'FrancoMarini',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should return an error because a key is missing (firstName not found)', async () => {
    const response = await request(app).post('/admins/').send({
      lastName: 'Marini',
      email: 'francomarini@gmail.com',
      password: 'FrancoM2022',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should return an error because the body is empty', async () => {
    const response = await request(app).post('/admins/').send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
});
