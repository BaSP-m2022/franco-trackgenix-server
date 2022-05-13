import express from 'express';
// import fs from 'fs';

const timesheets = [];

const router = express.Router();

router.delete('/:id', (req, res) => {
  const timesheetIdToFilter = req.query.id;
  const filteredTimesheets = timesheets.filter((timeSheet) => timeSheet.id !== timesheetIdToFilter);
  if (filteredTimesheets.length === timesheets.length) {
    res.send('Could not delete the timesheet because it was not found.');
  } else {
    // fs.writeFile('src/data/time-sheets.json', JSON.stringify(filteredTimesheets), (err) => {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     res.send(`
    // The user by the id of ${timesheetIdToFilter}
    // was deleted successfully from the timesheet list.
    // `);
    //   }
    // });
  }
});

router.get('/', (req, res) => {
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
});

router.get('/:id', (req, res) => {
  const byId = req.params.id;
  const filteredId = timesheets.find((timesheet) => timesheet.id === byId);
  if (filteredId) {
    res.send(filteredId);
  } else {
    res.send(`There are not ${byId}`);
  }
});

router.post('/', (req, res) => {
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
});

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
});

export default router;
