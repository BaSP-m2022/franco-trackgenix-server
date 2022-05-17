// import express from 'express';
// import fs from 'fs';

import TimeSheets from '../models/Time-sheets';

const deleteById = async (req, res) => {
  try {
    const timesheetIdToFilter = await TimeSheets.findByIdAndRemove(req.params.id);
    if (!timesheetIdToFilter) {
      res.status(404).json({
        message: 'Time-sheet was not found',
        data: undefined,
        error: true,
      });
    }
    res.status(200).json({
      message: 'Time-sheet deleted',
      data: timesheetIdToFilter,
      error: false,
    });
  } catch (error) {
    res.json({
      message: 'Time-sheet could not be deleted',
      data: undefined,
      error: true,
    });
  }
};

const createTimesheet = async (req, res) => {
  try {
    const newTimeSheet = new TimeSheets(req.body);
    await newTimeSheet.save();
    res.status(201).json({
      message: 'Time sheet created',
      data: newTimeSheet,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: 'An error ocurred',
      data: undefined,
      error: true,
    });
  }
};

const getById = async (req, res) => {
  try {
    const byId = await TimeSheets.findById(req.params.id);
    if (!byId) {
      res.status(404).json({
        message: 'Time-sheet was not found',
        data: undefined,
        error: true,
      });
    }
    res.status(200).json({
      message: 'Time-sheet found',
      data: byId,
      error: false,
    });
  } catch (error) {
    res.json({
      message: 'Time-sheet was not found',
      data: undefined,
      error: true,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const result = await TimeSheets.find(req.query);
    if (result.length > 0) {
      res.status(200).json({
        result,
        error: false,
      });
    } else {
      res.status(400).json({
        message: 'A valid parameter is needed',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: 'Time-sheet was not found',
      data: undefined,
      error: true,
    });
  }
};

const editTimesheet = async (req, res) => {
  try {
    if (req.params.id) {
      const timeSheet = await TimeSheets.findByIdAndUpdate({ _id: req.params.id }, req.body);
      if (!timeSheet) {
        res.status(404).json({
          message: 'Time sheet not found',
          data: undefined,
          error: true,
        });
      }
      res.status(200).json({
        message: 'Time sheet edited',
        data: timeSheet,
        error: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'An error ocurred',
      data: undefined,
      error: true,
    });
  }
};

export default {
  createTimesheet,
  editTimesheet,
  deleteById,
  getById,
  getAll,
};

/*
const getAll = (req, res) => {
  const tmManager = req.query.manager;
  const tmCheck = req.query.check;
  const tmProject = req.query.project;
  const tmUser = req.query.user;
  const tmDay = req.query.day;
  if (!tmManager
        && !tmProject
          && !tmUser
            && !tmDay
              && !tmCheck) {
    res.send(timesheets);
  }
  const filteredAll = timesheets.filter((timesheet) => {
    if (tmUser && tmDay && tmProject && tmCheck && tmManager) {
      return timesheet.user.toLowerCase().includes(tmUser.toLowerCase())
              && timesheet.day.toLowerCase().includes(tmDay.toLowerCase())
                && timesheet.project.toLowerCase().includes(tmProject.toLowerCase())
                  && timesheet.check.toLowerCase().includes(tmCheck.toLowerCase())
                    && timesheet.manager.toLowerCase().includes(tmManager.toLowerCase());
    }
    if (tmUser && tmDay && tmProject && tmManager) {
      return timesheet.user.toLowerCase().includes(tmUser.toLowerCase())
            && timesheet.day.toLowerCase().includes(tmDay.toLowerCase())
              && timesheet.project.toLowerCase().includes(tmProject.toLowerCase())
                && timesheet.manager.toLowerCase().includes(tmManager.toLowerCase());
    }
    if (tmUser && tmDay && tmProject) {
      return timesheet.user.toLowerCase().includes(tmUser.toLowerCase())
            && timesheet.day.toLowerCase().includes(tmDay.toLowerCase())
              && timesheet.project.toLowerCase().includes(tmProject.toLowerCase());
    }
    if (tmUser && tmDay) {
      return timesheet.user.toLowerCase().includes(tmUser.toLowerCase())
            && timesheet.day.toLowerCase().includes(tmDay.toLowerCase());
    }
    if (tmUser) {
      return timesheet.user.toLowerCase().includes(tmUser.toLowerCase());
    }
    if (tmDay) {
      return timesheet.day.toLowerCase().includes(tmDay.toLowerCase());
    }
    if (tmProject) {
      return timesheet.project.toLowerCase().includes(tmProject.toLowerCase());
    }
    if (tmManager) {
      return timesheet.manager.toLowerCase().includes(tmManager.toLowerCase());
    }
    if (typeof tmCheck !== 'undefined') {
      return timesheet.check.toString().toLowerCase().includes(tmCheck.toLowerCase());
    }
    return false;
  });
  if (filteredAll.length > 0) {
    res.send(filteredAll);
  } else {
    res.send('Timesheet not found');
  }
};

const create = (req, res) => {
  const newTimesheet = req.body;
  if (newTimesheet.id
    && newTimesheet.user
        && newTimesheet.day
            && newTimesheet.project
                && newTimesheet.tasks
                    && newTimesheet.workedHours
                        && newTimesheet.check !== 'undefined'
                            && newTimesheet.manager
  ) {
    timesheets.push(newTimesheet);
    // fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheets), (err) => {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     res.send('Timesheet created');
    //   }
    // });
  } else {
    res.send('Timesheet was not created');
  }
};

const edit = (req, res) => {
  const timesheetId = req.params.id;
  const timesheetTo = timesheets.find((timesheet) => timesheet.id === timesheetId);
  if (timesheetToModify) {
    const updateTimesheet = req.body;
    const newTimesheet = {};
    newTimesheet.id = timesheetId;
    newTimesheet.user = updateTimesheet.user ? updateTimesheet.user : timesheetToModify.user;

    newTimesheet.day = updateTimesheet.day ? updateTimesheet.day : timesheetToModify.day;

    newTimesheet.workedHours = updateTimesheet.workedHours
      ? updateTimesheet.workedHours : timesheetToModifiy.workedHours;

    newTimesheet.project = updateTimesheet.project
      ? updateTimesheet.project : timesheetToModifiy.project;

    newTimesheet.tasks = updateTimesheet.tasks ? updateTimesheet.tasks : timesheetToModifiy.tasks;

    newTimesheet.check = updateTimesheet.check !== 'undefined'
      ? updateTimesheet.check : timesheetToModifiy.check;

    newTimesheet.manager = updateTimesheet.manager
      ? updateTimesheet.manager : timesheetToModifiy.manager;

    const timesheetModified = timesheets.filter((timesheet) => timesheet.id !== timesheetId);
    timesheetModified.push(newTimesheet);
    // fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheetModified), (err) => {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     res.send('Timesheet modified');
    //   }
    // });
  } else {
    res.send('Id not found');
  }
};
*/
