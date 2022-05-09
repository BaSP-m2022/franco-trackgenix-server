/* eslint-disable max-len */
import express from 'express';
import fs from 'fs';

const timesheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(timesheets);
});
/// //// GET METHOD

router.get('/getByCheck/:check', (req, res) => {
  const hoursChecked = req.params.check === 'true';
  const filteredCheck = timesheets.filter((timesheet) => timesheet.check === hoursChecked);
  if (filteredCheck) {
    res.send(filteredCheck);
  } else {
    res.send(`There are not ${hoursChecked}`);
  }
});

router.get('/filter', (req, res) => {
  const timesheetManager = req.query.manager;
  const timesheetProject = req.query.project;
  const timesheetUser = req.query.user;
  const timesheetDay = req.query.day;
  if (!timesheetManager && !timesheetProject && !timesheetUser && !timesheetDay) {
    res.send('There are not filter');
  } else if (timesheetManager) {
    const filteredManager = timesheets.filter((timesheet) => timesheet.manager.includes(timesheetManager));
    if (filteredManager.length > 0) {
      res.send(filteredManager);
    } else {
      res.send(`There are not ${timesheetManager}`);
    }
  } else if (timesheetProject) {
    const filteredProject = timesheets.filter((timesheet) => timesheet.project.includes(timesheetProject));
    if (filteredProject.length > 0) {
      res.send(filteredProject);
    } else {
      res.send(`There are not ${timesheetProject}`);
    }
  } else if (timesheetUser) {
    const filteredUser = timesheets.filter((timesheet) => timesheet.user.includes(timesheetUser));
    if (filteredUser.length > 0) {
      res.send(filteredUser);
    } else {
      res.send(`There are not ${timesheetUser}`);
    }
  } else if (timesheetDay) {
    const filteredDay = timesheets.filter((timesheet) => timesheet.day.includes(timesheetDay));
    if (filteredDay.length > 0) {
      res.send(filteredDay);
    } else {
      res.send(`There are not ${timesheetDay}`);
    }
  }
});

/// //// POST METHOD

router.post('/', (req, res) => {
  const newTimesheet = req.body;
  timesheets.push(newTimesheet);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheets), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Timesheet created');
    }
  });
});

/// //// PUT METHOD

router.put('/:id', (req, res) => {
  const timesheetId = req.params.id;
  const timesheetToModifiy = timesheets.find((timesheet) => timesheet.id === timesheetId);
  if (timesheetToModifiy) {
    const updateTimesheet = req.body;
    const newTimesheet = {};
    newTimesheet.id = timesheetId;
    newTimesheet.user = updateTimesheet.user ? updateTimesheet.user : timesheetToModifiy.user;
    newTimesheet.day = updateTimesheet.day ? updateTimesheet.day : timesheetToModifiy.day;
    newTimesheet.workedHours = updateTimesheet.workedHours
      ? updateTimesheet.workedHours : timesheetToModifiy.workedHours;
    newTimesheet.project = updateTimesheet.project
      ? updateTimesheet.project : timesheetToModifiy.project;
    newTimesheet.task = updateTimesheet.task ? updateTimesheet.task : timesheetToModifiy.task;
    newTimesheet.manager = updateTimesheet.manager
      ? updateTimesheet.manager : timesheetToModifiy.manager;
    const timesheetModified = timesheets.filter((timesheet) => timesheet.id !== timesheetId);
    timesheetModified.push(newTimesheet);
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheetModified), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Timesheet modified');
      }
    });
  } else {
    res.send('Id not found');
  }
});

export default router;
