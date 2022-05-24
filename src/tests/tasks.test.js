import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import task from '../seeds/tasks';

beforeAll(async () => {
  await Tasks.collection.insertMany(task);
});

describe('GET - tasks/:id', () => {
  test('It should get the tasks list', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body.message).toBe('Tasks');
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });

  test('It should return a status 404 because id is incorrect', async () => {
    const response = await request(app).get('/tasks/628a59c9f67d451615818847').send();
    expect(response.body.message).toBe('Task not found');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
  });

  test('It should return a task', async () => {
    const response = await request(app).get('/tasks/6289adc53ba4baea7bf2defd').send();
    expect(response.body.message).toBe('Tasks');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });
});

describe('POST - /tasks', () => {
  test('It should create task', async () => {
    const response = await request(app).post('/tasks').send({
      description: 'Landing page',
      workedHours: 8,
      projectId: '6289ae2826280830345a9864',
      date: '2020-04-09',
    });
    expect(response.body.message).toBe('Task created');
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(false);
  });

  test('It should return a status 400', async () => {
    const response = await request(app).post('/tasks').send();
    expect(response.body.message).toBe('There was an error');
    expect(response.statusCode).toBe(400);
  });

  test('It should return an error because description is too short', async () => {
    const response = await request(app).post('/tasks').send({
      description: 'L',
      workedHours: 8,
      projectId: '628c3ac49d840d661742bad9',
      date: '2020-04-09',
    });
    expect(response.statusCode).toBe(400);
  });
});

describe('PUT - /tasks/:id', () => {
  test('It should return a status 404 because id is incorrect', async () => {
    const response = await request(app).put('/tasks/628ae081dbe588f5677e9982').send({
      description: 'Landing Page',
      workedHours: 8,
      projectId: '628c3ac49d840d661742bad9',
      date: '2020-04-09',
    });
    expect(response.body.message).toBe('Task not found');
    expect(response.statusCode).toBe(404);
  });

  test('It should update a task', async () => {
    const response = await request(app).put('/tasks/6289ae1eddf4236679923912').send({
      description: 'Landing Page',
      workedHours: 8,
      projectId: '628c3ac49d840d661742bad9',
      date: '2020-04-09',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });
});

describe('DELETE - /tasks/:id', () => {
  test('It should return a status 404', async () => {
    const response = await request(app).delete('/tasks/628281b30f0ab1495571e1a4').send();
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Task not found');
    expect(response.body.error).toBe(true);
  });

  test('It should return a status 200 with a succesful delete', async () => {
    const response = await request(app).delete('/tasks/6289a9f3c375d9047b94a4c5').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Task deleted successfully');
    expect(response.body.error).toBe(false);
  });

  test('It should return a status 500 because the id is not a mongoDB id', async () => {
    const response = await request(app).delete('/tasks/6289a9f3c375d9047b94a4c').send();
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('There was an error');
    expect(response.body.error).toBe(true);
  });
});
