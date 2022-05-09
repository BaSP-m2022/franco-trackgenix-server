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
  const tmManager = req.query.manager;
  const tmProject = req.query.project;
  const tmUser = req.query.user;
  const tmDay = req.query.day;
  const tmTask = req.query.task;
  if (!tmManager && !tmProject && !tmUser && !tmDay && !tmTask) {
    res.send('There are not filter');
  } else if (tmManager) {
    const filteredManager = timesheets.filter((timesheet) => timesheet.manager.includes(tmManager));
    if (filteredManager.length > 0) {
      res.send(filteredManager);
    }
  } else if (tmProject) {
    const filteredProject = timesheets.filter((timesheet) => timesheet.project.includes(tmProject));
    if (filteredProject.length > 0) {
      res.send(filteredProject);
    }
  } else if (tmUser) {
    const filteredUser = timesheets.filter((timesheet) => timesheet.user.includes(tmUser));
    if (filteredUser.length > 0) {
      res.send(filteredUser);
    }
  } else if (tmDay) {
    const filteredDay = timesheets.filter((timesheet) => timesheet.day.includes(tmDay));
    if (filteredDay.length > 0) {
      res.send(filteredDay);
    }
  } else if (tmTask) {
    const filteredTask = timesheets.filter((timesheet) => timesheet.task.includes(tmTask));
    if (filteredTask.length > 0) {
      res.send(filteredTask);
    }
  }
});

/// //// POST METHOD

router.post('/', (req, res) => {
  const newTimesheet = req.body;
  if (newTimesheet.id && newTimesheet.user && newTimesheet.day && newTimesheet.project && newTimesheet.task && newTimesheet.workedHours && newTimesheet.check && newTimesheet.manager) {
    timesheets.push(newTimesheet);
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheets), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Timesheet created');
      }
    });
  } else {
    res.send('Timesheet was not created');
  }
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
