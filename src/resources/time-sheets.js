import express from 'express';
import fs from 'fs';

const timesheet = require('../data/time-sheets.json');

const router = express.Router();

router.delete('/:id', (req, res) => {
  const timesheetIdToFilter = req.query.id;
  const filteredTimesheets = timesheet.filter((timeSheet) => timeSheet.id !== timesheetIdToFilter);
  if (filteredTimesheets.length === timesheet.length) {
    res.send('Could not delete the timesheet because it was not found.');
  } else {
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(filteredTimesheets), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`The user by the id of ${timesheetIdToFilter} was deleted successfully from the timesheet list.`);
      }
    });
  }
});

export default router;
