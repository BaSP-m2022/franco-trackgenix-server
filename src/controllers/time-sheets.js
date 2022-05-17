import TimeSheets from '../models/Time-sheets';
// import fs from 'fs';

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
};
