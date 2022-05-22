import request from 'supertest';
import Project from '../models/Projects';
import projectsSeeds from '../seeds/projects';
import app from '../app';

beforeAll(async () => {
  await Project.collection.insertMany(projectsSeeds);
});

const projectId = '628a59f1a847f0ea55251cc2';

describe('GET /projects', () => {
  test('It should get the project list', async () => {
    const response = await request(app).get('/projects');
    expect(response.body.message).toBe('Project found');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('It should get status 404', async () => {
    const response = await request(app).get('/projects?name=kldñfgkgñdfkgñdfl');
    expect(response.body.message).toBe('Error 404. Project not found with those parameters');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).not.toEqual(expect.anything());
  });
  test('duda', async () => {
    const response = await request(app).get('/projects?name=Twitter');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
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
    expect(response.body.data).not.toEqual(expect.anything());
  });
  test('It should return status 500', async () => {
    const response = await request(app).delete('/projects/6').send();
    expect(response.body.message).toBe('Cast to ObjectId failed for value "6" (type string) at path "_id" for model "Project"');
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe(true);
    expect(response.body.data).not.toEqual(expect.anything());
  });
});
