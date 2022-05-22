import request from 'supertest';
import TimeSheet from '../models/Time-sheets';
import timeSheetSeeds from '../seeds/time-sheets';
import app from '../app';

const timeSheetId = '628a97a1e1c673704bbfa91b';
beforeAll(async () => {
  await TimeSheet.collection.insertMany(timeSheetSeeds);
});

describe('GET/timeSheet', () => {
  test('It should get the TimeSheet list', async () => {
    const response = await request(app).get('/time-sheets');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Time-sheets');
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
  test('It should get 404', async () => {
    const response = await request(app).get('/time-sheets?totalHours=564125032064620240968468451');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('A valid parameter is needed');
    expect(response.body.error).toBe(true);
    expect(response.body.data).not.toEqual(expect.anything());
  });
});

describe('DELETE/timeSheet/:id', () => {
  test('should delete', async () => {
    const response = await request(app).delete(`/time-sheets/${timeSheetId}`).send();
    expect(response.statusCode).toBe(200);
  });
  test('It should get 404', async () => {
    const response = await request(app).delete('/time-sheets/628a979a3661749f792a55c3');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Time-sheet was not found');
    expect(response.body.error).toBe(true);
    expect(response.body.data).not.toEqual(expect.anything());
  });
  test('It should get 500', async () => {
    const response = await request(app).delete('/time-sheets/1');
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Time-sheet could not be deleted');
    expect(response.body.error).toBe(true);
    expect(response.body.data).not.toEqual(expect.anything());
  });
});
