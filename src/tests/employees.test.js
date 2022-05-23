import request from 'supertest';
import Employee from '../models/Employees';
import employeeSeeds from '../seeds/employees';
import app from '../app';

beforeAll(async () => {
  await Employee.collection.insertMany(employeeSeeds);
});

// const employeeId = '60d4a32f257e066e9495ce12';

describe('GET/employees', () => {
  test('It should get the employees list', async () => {
    const response = await request(app).get('/employees');
    expect(response.body.message).toBe('Success');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
  test('It should return a 404 status', async () => {
    const response = await request(app).get('/employees?firstName=Pepito');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Employee was not found');
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
  test('It should return a 500 status', async () => {
    const response = await request(app).get('/employees/12345');
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('error');
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
});
/*
describe('GET by id/employees/:id', () => {
  test('It should get an employee by id', async () => {
    const response = await request(app).get(`/employees/${employeeId}`);
    expect(response.body.message).toBe('Employee found successfully');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
});

describe('POST/employees', () => {
  test('It should create an employee', async () => {
    const response = await request(app).post('employee').send({
      firstName: 'Esteban',
      lastName: 'Frare',
      dni: '38240915',
      email: 'esteban.frare@radiumrocket.com',
      password: 'test123',
      dateOfBirth: '03-11-1987',
    });
    expect(response.body.message).toBe('Employee added to database');
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(false);
  });
  test('404 error because the email entered is already in use', async () => {
    const response = await request(app).post('employee').send({
      firstName: 'Esteban',
      lastName: 'Frare',
      dni: '38240915',
      email: 'esteban.frare@radiumrocket.com',
      password: 'test123',
      dateOfBirth: '03-11-1987',
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('An employee with this email already exists');
    expect(response.body.data).toBeUndefined();
  });
});

describe('PUT/employees/:id', () => {
  test('It should delete an employee', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send(
      {
        firstName: 'Totito',
        lastName: 'Chulito',
        dni: '33016244',
        email: 'totalfake@whatever.com',
        password: 'Holaprob123',
        dateOfBirth: '05-05-1985',
      },
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Employee edited');
    expect(response.body.error).toBe(false);
    expect(response.body.data).toEqual(expect.anything());
  });
});

describe('DELETE/employee', () => {
  test('It should delete an employee', async () => {
    const response = await request(app).delete(`/employees/${employeeId}`);
    expect(response.body.message).toBe('Employee deleted successfully');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });
});
*/
