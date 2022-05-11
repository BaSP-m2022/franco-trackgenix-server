import express from 'express';
import fs from 'fs';

const timesheet = require('../data/time-sheets.json');

const router = express.Router();

// GET A TIMESHEET
// FULL LIST

router.get('/getAllTimesheet', (req, res) => {
  res.send(timesheet);
});

// GET BY USER

router.get('/getByUser', (req, res) => {
  const timesheetUser = req.query.user;
  const result = timesheet.filter((filteredUser) => filteredUser.user === timesheetUser);
  if (result.length > 0) {
    res.send(result);
  }
  res.send(`There are not timesheets with users by the name of ${timesheetUser}`);
});

// GET BY ID

router.get('/getById', (req, res) => {
  const timesheetId = req.query.id;
  const result = timesheet.filter((filteredId) => filteredId.id === timesheetId);
  if (result.length > 0) {
    res.send(result);
  }
  res.send(`There are not timesheets with users by the id of ${timesheetId}`);
});

// GET BY MANAGER

router.get('/getByManager', (req, res) => {
  const timesheetManager = req.query.manager;
  const result = timesheet.filter((filteredManager) => filteredManager.manager
  === timesheetManager);
  if (result.length > 0) {
    res.send(result);
  }
  res.send(`There are not timesheets with managers by the name of ${timesheetManager}`);
});

// GET BY PROJECT

router.get('/getByProject', (req, res) => {
  const timesheetProject = req.query.project;
  const result = timesheet.filter((filteredProject) => filteredProject.project
  === timesheetProject);
  if (result.length > 0) {
    res.send(result);
  }
  res.send(`There are not timesheets with projects by the name of ${timesheetProject}`);
});

// GET BY DAY

router.get('/getByDay', (req, res) => {
  const timesheetDay = req.query.day;
  const result = timesheet.filter((filteredDay) => filteredDay.day === timesheetDay);
  if (result.length > 0) {
    res.send(result);
  }
  res.send(`There is no register of the following day: ${timesheetDay}`);
});

// DELETE A TIMESHEET

// DELETE BY USER

router.delete('/deleteTimesheet', (req, res) => {
  const timesheetUser = req.query.user;
  const usersToNotDelete = timesheet.filter((timesheetUsers) => timesheetUsers.user
   !== timesheetUser);
  if (usersToNotDelete.length === timesheet.length) {
    res.send('Could not delete the timesheet because it was not found.');
  } else {
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(usersToNotDelete), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`The user ${timesheetUser} was deleted successfully from the timesheet list.`);
      }
    });
  }
});

// DELETE BY ID

router.delete('/deleteTimesheet/ById', (req, res) => {
  const timesheetIdToFilter = req.query.id;
  const idToNotDelete = timesheet.filter((timesheetId) => timesheetId.id !== timesheetIdToFilter);
  if (idToNotDelete.length === timesheet.length) {
    res.send('Could not delete the timesheet because it was not found.');
  } else {
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(idToNotDelete), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`The user by the id of ${timesheetIdToFilter} was deleted successfully from the timesheet list.`);
      }
    });
  }
});

export default router;
