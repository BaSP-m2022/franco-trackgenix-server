// const express = require('express');
import express from 'express';

const timesheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(timesheets);
});
// /getAllTimesheet

router.get('/getByCheck/:check', (req, res) => {
  const hoursChecked = req.params.check === 'true';
  const filteredCheck = timesheets.filter((timesheet) => timesheet.check === hoursChecked);
  if (filteredCheck) {
    res.send(filteredCheck);
  } else {
    res.send(`There are not ${hoursChecked}`);
  }
});

router.get('/getByManager', (req, res) => {
  const timesheetManager = req.query.manager;
  const filteredManager = timesheets.filter(
    (timesheet) => timesheet.manager === timesheetManager,
  );
  if (filteredManager.length > 0) {
    res.send(filteredManager);
  } else {
    res.send(`There are not ${timesheetManager}`);
  }
});

router.get('/getByProject', (req, res) => {
  const timesheetProject = req.query.project;
  const filteredProject = timesheets.filter(
    (timesheet) => timesheet.project === timesheetProject,
  );
  if (filteredProject.length > 0) {
    res.send(filteredProject);
  } else {
    res.send(`There are not ${timesheetProject}`);
  }
});

router.get('/getByUser', (req, res) => {
  const timesheetUser = req.query.user;
  const filteredUser = timesheets.filter(
    (timesheet) => timesheet.user === timesheetUser,
  );
  if (filteredUser.length > 0) {
    res.send(filteredUser);
  } else {
    res.send(`There are not ${timesheetUser}`);
  }
});
router.get('/getByDay', (req, res) => {
  const timesheetDay = req.query.day;
  const filteredDay = timesheets.filter(
    (timesheet) => timesheet.day === timesheetDay,
  );
  if (filteredDay.length > 0) {
    res.send(filteredDay);
  } else {
    res.send(`There are not ${timesheetDay}`);
  }
});

export default router;
