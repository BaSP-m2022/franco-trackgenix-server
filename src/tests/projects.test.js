import request from 'supertest';
import Project from '../models/Projects';
import Employee from '../models/Employees';
import projectsSeeds from '../seeds/projects';
import employeeSeeds from '../seeds/employees';
import app from '../app';

beforeAll(async () => {
  await Project.collection.insertMany(projectsSeeds);
  await Employee.collection.insertMany(employeeSeeds);
});

const projectId = '628a5a6d243774d9ac3969f7';

describe('GET /projects', () => {
  test('It should get the project list', async () => {
    const response = await request(app).get('/projects');
    expect(response.body.message).toBe('Project found');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0].employees[0].employeeId.firstName).toBe('Roman');
  });
  test('It should get status 404', async () => {
    const response = await request(app).get('/projects?name=kldñfgkgñdfkgñdfl');
    expect(response.body.message).toBe('Error 404. Project not found with those parameters');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
  test('It should get an array of two objects', async () => {
    const response = await request(app).get('/projects?name=Twitter');
    expect(response.body.message).toBe('Project found');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('It should get an array of one object', async () => {
    const response = await request(app).get('/projects?name=Facebook');
    expect(response.body.message).toBe('Project found');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('It should get populate employee', async () => {
    const response = await request(app).get('/projects');
    expect(response.body.data[0].employees[0].employeeId._id).toBe('6289016df4d67ad85b52d9af');
    expect(response.body.data[0].employees[0].employeeId.firstName).toBe('Roman');
    expect(response.body.data[0].employees[0].employeeId.lastName).toBe('Riquelme');
  });
});

describe('PUT /project', () => {
  test('It should get status 200', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'GitHub',
      status: 'inactive',
      description: 'BaSP-TG-26: snapchat',
      employees: [
        {
          rate: 5,
          role: 'PM',
          employeeId: '62840603549ef329a075ef63',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.msg).toBe('Project updated');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data).not.toBe(undefined);
  });
  test('It should get status 400 and name empty', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: '',
      status: 'inactive',
      description: 'BaSP-TG-26: snapchat',
      employees: [
        {
          rate: 5,
          role: 'PM',
          employeeId: '62840603549ef329a075ef63',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe('"name" is not allowed to be empty');
    expect(response.body.error).toBe(true);
  });
  test('It should get status 400 and status incorrect', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'Github',
      status: 'asd',
      description: 'BaSP-TG-26: snapchat',
      employees: [
        {
          rate: 5,
          role: 'PM',
          employeeId: '62840603549ef329a075ef63',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe('"status" must be one of [active, inactive]');
    expect(response.body.error).toBe(true);
  });
  test('It should get status 400 and description empty', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'Github',
      status: 'active',
      description: '',
      employees: [
        {
          rate: 5,
          role: 'PM',
          employeeId: '62840603549ef329a075ef63',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe('"description" is not allowed to be empty');
    expect(response.body.error).toBe(true);
  });
  test('It should get status 400 and rate empty', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'Github',
      status: 'active',
      description: 'insert description',
      employees: [
        {
          rate: '',
          role: 'PM',
          employeeId: '62840603549ef329a075ef63',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe('"employees[0].rate" must be a number');
    expect(response.body.error).toBe(true);
  });
  test('It should get status 400 and role empty', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'Github',
      status: 'active',
      description: 'insert description',
      employees: [
        {
          rate: 12,
          role: '',
          employeeId: '62840603549ef329a075ef63',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe('"employees[0].role" is not allowed to be empty');
    expect(response.body.error).toBe(true);
  });
  test('It should get status 500 and employee ID invalid', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'Github',
      status: 'active',
      description: 'insert description',
      employees: [
        {
          rate: 12,
          role: 'PM',
          employeeId: '62840603549ef329a075ef6',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
    });
    expect(response.body.message).toBe('Cast to embedded failed for value "{ rate: 12, role: \'PM\', employeeId: \'62840603549ef329a075ef6\' }" (type Object) at path "employees" because of "CastError"');
    expect(response.statusCode).toBe(500);
    expect(response.body.data).toBe(undefined);
    expect(response.body.error).toBe(true);
  });
  test('It should get status 400 and startDate empty', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'Github',
      status: 'active',
      description: 'insert description',
      employees: [
        {
          rate: 12,
          role: 'PM',
          employeeId: '62840603549ef329a075ef63',
        },
      ],
      startDate: '',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe('"startDate" must be a valid date');
    expect(response.body.error).toBe(true);
  });
  test('It should get status 400 and startDate empty', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      name: 'Github',
      status: 'active',
      description: 'insert description',
      employees: [
        {
          rate: 12,
          role: 'PM',
          employeeId: '62840603549ef329a075ef63',
        },
      ],
      startDate: '2002-12-09T00:00:00.000+00:00',
      endDate: '',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBe('"endDate" must be a valid date');
    expect(response.body.error).toBe(true);
  });
});

describe('DELETE /projects/:id', () => {
  test('It should delete project', async () => {
    const response = await request(app).delete(`/projects/${projectId}`).send();
    expect(response.body.message).toBe('Project deleted');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data).toEqual(expect.anything());
  });
  test('It should return status 404', async () => {
    const response = await request(app).delete('/projects/628a59c9f67d45161581886a').send();
    expect(response.body.message).toBe('Project not found');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
  test('It should return status 500', async () => {
    const response = await request(app).delete('/projects/6').send();
    expect(response.body.message).toBe('Cast to ObjectId failed for value "6" (type string) at path "_id" for model "Project"');
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
  test('It should return project not found', async () => {
    const response = await request(app).get(`/projects/${projectId}`);
    expect(response.body.message).toBe('Project not found');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
});
