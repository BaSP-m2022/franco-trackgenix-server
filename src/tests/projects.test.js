import request from 'supertest';
import Project from '../models/Project';
import projectsSeeds from '../seeds/projects';
import app from '../app';

beforeAll(async () => {
  await Project.collection.insertMany(projectsSeeds);
});

describe('Test Employees routes', () => {
  test('It should get the project list', async () => {
    const response = await request(app).get('/projects');
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });
});
