import request from 'supertest';
import TimeSheet from '../models/Time-sheets';
import Employee from '../models/Employees';
import Task from '../models/Tasks';
import timeSheetSeeds from '../seeds/time-sheets';
import employeesSeeds from '../seeds/employees';
import taskSeed from '../seeds/tasks';
import app from '../app';

const timeSheetId = '628a97a1e1c673704bbfa91b';
beforeAll(async () => {
  await TimeSheet.collection.insertMany(timeSheetSeeds);
  await Employee.collection.insertMany(employeesSeeds);
  await Task.collection.insertMany(taskSeed);
});

describe('GET/timeSheet', () => {
  test('It should get the TimeSheet list', async () => {
    const response = await request(app).get('/time-sheets');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Time-sheets');
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
  test('It should get status 404', async () => {
    const response = await request(app).get('/time-sheets?totalHours=564125032064620240968468451');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Time-sheet was not found');
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
  test('It should get an any array of two objects', async () => {
    const response = await request(app).get('/time-sheets?totalHours=13');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Time-sheets');
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
  test('It should get an any array of one objects', async () => {
    const response = await request(app).get('/time-sheets?totalHours=6');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Time-sheets');
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
  test('It should populate the Employee information', async () => {
    const response = await request(app).get('/time-sheets');
    expect(response.body.data[0].employeeId._id).toBe('60d4a32f257e066e9495ce12');
    expect(response.body.data[0].employeeId.firstName).toBe('Esteban');
    expect(response.body.data[0].employeeId.lastName).toBe('Frare');
  });
  test('It should populate the task information', async () => {
    const response = await request(app).get('/time-sheets');
    expect(response.body.data[0].tasks[0]._id).toBe('6289a9f3c375d9047b94a4c5');
    expect(response.body.data[0].tasks[0].description).toBe('Figma design');
    expect(response.body.data[0].tasks[0].workedHours).toBe(12);
    expect(response.body.data[0].tasks[0].date).toBe('2020-01-09T00:00:00.000Z');
    expect(response.body.data[0].tasks[0].projectId).toBe('6289ad47d8843229e170f328');
  });
});

describe('PUT/timeSheet/:id', () => {
  test('It should put successfully', async () => {
    const response = await request(app).put(`/time-sheets/${timeSheetId}`).send(
      {
        tasks: ['6289a9f3c375d9047b94a4c5'],
        totalHours: 13,
        status: 'active',
        startDate: '2021-12-12T00:00:00.000+00:00',
        endDate: '2022-12-12T00:00:00.000+00:00',
        employeeId: '60d4a32f257e066e9495ce12',
      },
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Time sheet edited');
    expect(response.body.error).toBe(false);
    expect(response.body.data).toEqual(expect.anything());
  });
  test('It should get status 500 and task empty', async () => {
    const response = await request(app).put(`/time-sheets/${timeSheetId}`).send(
      {
        tasks: [''],
        totalHours: 13,
        status: 'active',
        startDate: '2021-12-12T00:00:00.000+00:00',
        endDate: '2022-12-12T00:00:00.000+00:00',
        employeeId: '60d4a32f257e066e9495ce12',
      },
    );
    expect(response.body.message).toBe('An error ocurred');
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe(true);
  });
  test('It should get status 400 and total hours empty', async () => {
    const response = await request(app).put(`/time-sheets/${timeSheetId}`).send(
      {
        tasks: ['6289a9f3c375d9047b94a4c5'],
        totalHours: '',
        status: 'active',
        startDate: '2021-12-12T00:00:00.000+00:00',
        endDate: '2022-12-12T00:00:00.000+00:00',
        employeeId: '60d4a32f257e066e9495ce12',
      },
    );
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should get status 400 and status incorrect', async () => {
    const response = await request(app).put(`/time-sheets/${timeSheetId}`).send(
      {
        tasks: ['6289a9f3c375d9047b94a4c5'],
        totalHours: 13,
        status: 15154,
        startDate: '2021-12-12T00:00:00.000+00:00',
        endDate: '2022-12-12T00:00:00.000+00:00',
        employeeId: '60d4a32f257e066e9495ce12',
      },
    );
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should get status 400 and start date empty', async () => {
    const response = await request(app).put(`/time-sheets/${timeSheetId}`).send(
      {
        tasks: ['6289a9f3c375d9047b94a4c5'],
        totalHours: 13,
        status: 'active',
        startDate: '',
        endDate: '2022-12-12T00:00:00.000+00:00',
        employeeId: '60d4a32f257e066e9495ce12',
      },
    );
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should get status 400 and end date empty', async () => {
    const response = await request(app).put(`/time-sheets/${timeSheetId}`).send(
      {
        tasks: ['6289a9f3c375d9047b94a4c5'],
        totalHours: 13,
        status: 'active',
        startDate: '2021-12-12T00:00:00.000+00:00',
        endDate: '',
        employeeId: '60d4a32f257e066e9495ce12',
      },
    );
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('It should get status 400 and employeeId empty', async () => {
    const response = await request(app).put(`/time-sheets/${timeSheetId}`).send(
      {
        tasks: ['6289a9f3c375d9047b94a4c5'],
        totalHours: 13,
        status: 'active',
        startDate: '2021-12-12T00:00:00.000+00:00',
        endDate: '2022-12-12T00:00:00.000+00:00',
        employeeId: '',
      },
    );
    expect(response.body.message).toBe('There was an error during validation');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(true);
  });
});

describe('DELETE/timeSheet/:id', () => {
  test('should delete', async () => {
    const responseDelete = await request(app).delete(`/time-sheets/${timeSheetId}`).send();
    expect(responseDelete.statusCode).toBe(200);
    expect(responseDelete.body.error).toBe(false);
    expect(responseDelete.body.message).toBe('Time-sheet deleted');
    expect(responseDelete.body.data).toEqual(expect.anything());
    const responseGet = await request(app).get(`/time-sheets/${timeSheetId}`);
    expect(responseGet.statusCode).toBe(404);
  });
  test('It should get status 404', async () => {
    const response = await request(app).delete('/time-sheets/628a979a3661749f792a55c3');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Time-sheet was not found');
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
  });
  test('It should get status 500', async () => {
    const response = await request(app).delete('/time-sheets/1');
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Time-sheet could not be deleted');
    expect(response.body.error).toBe(true);
    expect(response.body.data).not.toEqual(expect.anything());
  });
});
