import request from 'supertest';
import Employee from '../models/Employees';
import employeeSeeds from '../seeds/employees';
import app from '../app';

beforeAll(async () => {
  await Employee.collection.insertMany(employeeSeeds);
});

const employeeId = '60d4a32f257e066e9495ce12';

describe('GET/employees', () => {
  test('It should get the employees list', async () => {
    const response = await request(app).get('/employees');
    expect(response.body.message).toBe('Employee found successfully');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
});

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
      password: 'test123',
      email: 'esteban.frare@radiumrocket.com',
      firstName: 'Esteban',
      lastName: 'Frare',
    });
    expect(response.body.message).toBe('Employee added to database');
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(false);
  });
});

describe('PUT/employees', () => {
  test('It should edit an employee', async () => {
    const response = await request(app).put('employee').send({
      password: 'Holaprob123',
      email: 'totalfake@whatever.com',
      firstName: 'Totito',
      lastName: 'Chulito',
    });
    expect(response.body.message).toBe('Employee edited successfully');
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(false);
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
