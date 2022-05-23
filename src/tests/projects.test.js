import request from 'supertest';
import Project from '../models/Projects';
import Employee from '../models/Employees';
import projectsSeeds from '../seeds/projects';
import employeesSeeds from '../seeds/employees';
import app from '../app';

beforeAll(async () => {
  await Project.collection.insertMany(projectsSeeds);
  await Employee.collection.insertMany(employeesSeeds);
});

const projectId = '628a5a6d243774d9ac3969f7';
describe('GET /:id', () => {
  test('It should get the project whit the ID required', async () => {
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.body.message).toBe('Project found');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });
  test('It should get an array of one populate', async () => {
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.body.data.employees[0].employeeId._id).toBe('62840603549ef329a075ef63');
    expect(response.body.data.employees[0].employeeId.firstName).toBe('Luciano');
    expect(response.body.data.employees[0].employeeId.lastName).toBe('Alarcon');
  });
  test('It should return a status 404', async () => {
    const response = await request(app).get('/projects/628a59c9f67d451615818847').send();
    expect(response.body.message).toBe('Project not found');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
  });
  test('It should return a status 500', async () => {
    const response = await request(app).get('/projects/6').send();
    expect(response.body.message.message).toBe('Cast to ObjectId failed for value "6" (type string) at path "_id" for model "Project"');
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe(true);
  });
});
describe('POST /', () => {
  test('It should create the project', async () => {
    const response = await request(app).post('/projects/').send({
      name: 'Radium Rocket',
      status: 'active',
      description: 'BaSP-TG-26: radium',
      employees: [
        {
          rate: 1,
          role: 'QA',
          employeeId: '60d4a32f257e066e9495ce12',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('Project was created.');
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(false);
  });
  test('It should was error about the keys (name => nombre)', async () => {
    const response = await request(app).post('/projects/').send({
      Nombre: 'Radium Rocket',
      status: 'active',
      description: 'BaSP-TG-26: radium',
      employees: [
        {
          rate: 1,
          role: 'QA',
          employeeId: '60d4a32f257e066e9495ce12',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should was error about the keys (name < 3)', async () => {
    const response = await request(app).post('/projects/').send({
      name: 'R',
      status: 'active',
      description: 'BaSP-TG-26: radium',
      employees: [
        {
          rate: 1,
          role: 'QA',
          employeeId: '60d4a32f257e066e9495ce12',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.body.data).toBe('"name" length must be at least 3 characters long');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should was error about the keys (status != active, inactive)', async () => {
    const response = await request(app).post('/projects/').send({
      name: 'Radium Rocket',
      status: 'activo',
      description: 'BaSP-TG-26: radium',
      employees: [
        {
          rate: 1,
          role: 'QA',
          employeeId: '60d4a32f257e066e9495ce12',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.body.data).toBe('"status" must be one of [active, inactive]');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should was error about the keys (description < 10)', async () => {
    const response = await request(app).post('/projects/').send({
      name: 'Radium Rocket',
      status: 'active',
      description: 'Ba',
      employees: [
        {
          rate: 1,
          role: 'QA',
          employeeId: '60d4a32f257e066e9495ce12',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.body.data).toBe('"description" length must be at least 10 characters long');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should was error about the keys (rate != number)', async () => {
    const response = await request(app).post('/projects/').send({
      name: 'Radium Rocket',
      status: 'active',
      description: 'BaSP-TG-26: radium',
      employees: [
        {
          rate: 'asd',
          role: 'QA',
          employeeId: '60d4a32f257e066e9495ce12',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.body.data).toBe('"employees[0].rate" must be a number');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should was error about the keys (role != string)', async () => {
    const response = await request(app).post('/projects/').send({
      name: 'Radium Rocket',
      status: 'active',
      description: 'BaSP-TG-26: radium',
      employees: [
        {
          rate: 1,
          role: 13,
          employeeId: '60d4a32f257e066e9495ce12',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.body.data).toBe('"employees[0].role" must be a string');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should was error about the keys (date != date format)', async () => {
    const response = await request(app).post('/projects/').send({
      name: 'Radium Rocket',
      status: 'active',
      description: 'BaSP-TG-26: radium',
      employees: [
        {
          rate: 1,
          role: 'QA',
          employeeId: '60d4a32f257e066e9495ce12',
        },
      ],
      startDate: 'asd',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.body.data).toBe('"startDate" must be a valid date');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should was error because a key is missing (name => not found)', async () => {
    const response = await request(app).post('/projects/').send({
      status: 'active',
      description: 'BaSP-TG-26: radium',
      employees: [
        {
          rate: 1,
          role: 'QA',
          employeeId: '60d4a32f257e066e9495ce12',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.body.data).toBe('"name" is required');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should was error because the body is empty', async () => {
    const response = await request(app).post('/projects/').send({});
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.body.data).toBe('"name" is required');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should was error about the keys (id != mongooseId)', async () => {
    const response = await request(app).post('/projects/').send({
      name: 'Radium Rocket',
      status: 'active',
      description: 'BaSP-TG-26: radium',
      employees: [
        {
          rate: 1,
          role: 'QA',
          employeeId: '123',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.message.message).toBe('Project validation failed: employees.0.employeeId: Cast to ObjectId failed for value "123" (type string) at path "employeeId" because of "BSONTypeError"');
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe(true);
  });
});
