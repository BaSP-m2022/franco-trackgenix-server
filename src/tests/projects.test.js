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

describe('Test Projects routes', () => {
  test('It should get the project list', async () => {
    const response = await request(app).get('/projects');
    expect(response.body.message).toBe('Project found');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
});
