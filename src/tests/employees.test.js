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
    const response = await request(app).get('/employees/');
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
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
});

describe('GET by id/employees/:id', () => {
  test('It should get an employee by id', async () => {
    const response = await request(app).get(`/employees/${employeeId}`);
    expect(response.body.message).toBe('Success');
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBe(false);
  });
  test('It should return a 404 status', async () => {
    const response = await request(app).get('/employees/60d4a32f257e066e9495cc11');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Employee was not found');
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
  test('It should return a 500 status', async () => {
    const response = await request(app).get('/employees/12345');
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
});

describe('POST/employees', () => {
  test('It should create an employee', async () => {
    const response = await request(app).post('/employees/').send({
      firstName: 'Esteban',
      lastName: 'Frare',
      dni: '38240915',
      email: 'esteban.frare@radiumrocket.com',
      password: 'test1234',
      dateOfBirth: '03-11-1987',
    });
    expect(response.body.message).toBe('Employee created successfully');
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(false);
  });
  test('Should return an error when the password is too short', async () => {
    const response = await request(app).post('/employees/').send({
      firstName: 'Esteban',
      lastName: 'Frare',
      dni: '38240915',
      email: 'esteban.frare@radiumrocket.com',
      password: 'test123',
      dateOfBirth: '03-11-1987',
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Password must have between 8 and 12 characters');
    expect(response.body.data).toBe(undefined);
  });
});

describe('PUT/employees/:id', () => {
  test('It should return that employee is updated sucessfully', async () => {
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
    expect(response.body.message).toBe('Employee edited successfully');
    expect(response.body.error).toBe(false);
    expect(response.body.data).toEqual(expect.anything());
  });
  test('It should return a 400 status when any parameter left', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send(
      {
        firstName: 'Totito',
        dni: '33016244',
        email: 'totalfake@whatever.com',
        password: 'Holaprob123',
        dateOfBirth: '05-05-1985',
      },
    );
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('\"lastName\" is required');
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
  test('It should return a 404 status', async () => {
    const response = await request(app).put('/employees/62830ed24887fa4590d33123').send(
      {
        firstName: 'Totito',
        lastName: 'Chulito',
        dni: '33016244',
        email: 'totalfake@whatever.com',
        password: 'Holaprob123',
        dateOfBirth: '05-05-1985',
      },
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('The employee has not been found');
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
  test('It should return error when any parameter is empty', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send(
      {
        firstName: '',
        lastName: 'Chulito',
        dni: '33016244',
        email: 'totalfake@whatever.com',
        password: 'Holaprob123',
        dateOfBirth: '05-05-1985',
      },
    );
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('\"firstName\" is not allowed to be empty');
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
});

describe('DELETE/employee', () => {
  test('It should delete an employee', async () => {
    const response = await request(app).delete('/employees/62830ed24887fa4590d33107').send();
    expect(response.body.message).toBe('Employee deleted successfully');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });
  test('It should return a 404 error', async () => {
    const response = await request(app).delete('/employees/62830ed24888fa6590d33187').send();
    expect(response.body.message).toBe('Employee ID not found');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
  });
});
