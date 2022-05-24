import request from 'supertest';
import TimeSheet from '../models/Time-sheets';
import Employee from '../models/Employees';
import Task from '../models/Tasks';
import timeSheetSeeds from '../seeds/time-sheets';
import employeesSeeds from '../seeds/employees';
import taskSeed from '../seeds/tasks';
import app from '../app';

// const idToGet = '628a97a1e1c673704bbfa91b';
beforeAll(async () => {
  await TimeSheet.collection.insertMany(timeSheetSeeds);
  await Employee.collection.insertMany(employeesSeeds);
  await Task.collection.insertMany(taskSeed);
});

describe('Time-sheet GET BY ID', () => {
  test('status: 200', async () => {
    const response = await request(app).get('/time-sheets/3687ff4624476153a8b17691').send();
    expect(response.body.message).toBe('Time-sheet found');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });
  test('ERROR status: 404', async () => {
    const response = await request(app).get('/time-sheets/3687ff4624676153a8b17691').send();
    expect(response.body.message).toBe('Time-sheet was not found');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(true);
  });
  test('ERROR status: 500', async () => {
    const response = await request(app).get('/time-sheets/3').send();
    expect(response.body.message).toBe('Time-sheet was not found');
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe(true);
  });
  test('populate is working in Employee', async () => {
    const response = await request(app).get('/time-sheets/3687ff4624476153a8b17691').send();
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.data.employeeId._id).toBe('6289016df4d67ad85b52d9af');
    expect(response.body.data.employeeId.first_name).toBe('Carlos');
    expect(response.body.data.employeeId.last_name).toBe('Rodriguez');
  });
  test('populate is working in Task (single task)', async () => {
    const response = await request(app).get('/time-sheets/3687ff4624476153a8b17691').send();
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.data.tasks[0]._id).toBe('6289a9f3c375d9047b94a4c5');
    expect(response.body.data.tasks[0].description).toBe('Landing page: HTML structure');
    expect(response.body.data.tasks[0].workedHours).toBe(9);
    expect(response.body.data.tasks[0].date).toBe('2020-02-09T00:00:00.000Z');
    expect(response.body.data.tasks[0].projectId).toBe('6289ad47d8843229e170f328');
  });
});

describe('Time-sheet POST', () => {
  test('status:200 | expected to create a time-sheet', async () => {
    const response = await request(app).post('/time-sheets/').send({
      tasks: ['6289a9f3c375d9047b94a4c5'],
      totalHours: 13,
      status: 'active',
      startDate: '2021-12-12T00:00:00.000+00:00',
      endDate: '2022-12-12T00:00:00.000+00:00',
      employeeId: '62830ed24887fa4590d33107',
    });
    expect(response.body.message).toBe('Time sheet created');
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(false);
  });
  test('ERROR status: 400 (EMPTY BODY)', async () => {
    const response = await request(app).post('/time-sheets/').send();
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('ERROR status: 400 (WRONG KEY)', async () => {
    const response = await request(app).post('/time-sheets/').send({
      tareas: ['6289a9f3c375d9047b94a4c5'],
      totalHours: 13,
      status: 'active',
      startDate: '2021-12-12T00:00:00.000+00:00',
      endDate: '2022-12-12T00:00:00.000+00:00',
      employeeId: '62830ed24887fa4590d33107',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('ERROR status: 400 (MISSING KEYS)', async () => {
    const response = await request(app).post('/time-sheets/').send({
      totalHours: 13,
      startDate: '2021-12-12T00:00:00.000+00:00',
      endDate: '2022-12-12T00:00:00.000+00:00',
      employeeId: '62830ed24887fa4590d33107',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('ERROR status: 400 (WRONG DATA TYPE)', async () => {
    const response = await request(app).post('/time-sheets/').send({
      tasks: ['6289a9f3c375d9047b94a4c5'],
      totalHours: 13,
      status: 'active',
      startDate: '2021-12-1lakjsfhlkawj000+00:00',
      endDate: '2022-12-12T00:00:00.000+00:00',
      employeeId: '62830ed24887fa4590d33107',
    });
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
});
