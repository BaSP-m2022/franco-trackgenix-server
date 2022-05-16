import TimeSheet from '../models/Time-sheets';
// import fs from 'fs';

const createTimesheet = async (req, res) => {
  try {
    const newTimeSheet = new TimeSheet({
      tasks: req.body.tasks,
      totalHours: req.body.totalHours,
      checked: req.body.checked,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      projectId: req.body.projectId,
      employeeId: req.body.employeeId,
      managerId: req.body.managerId,
    });
    await newTimeSheet.save();
    return res.status(201).json({
      message: 'Time sheet created',
      data: newTimeSheet,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const editTimesheet = async (req, res) => {
  try {
    const timeSheet = await TimeSheet.findByIdAndUpdate(req.params.id, req.body);
    return res.status(201).json({
      message: 'Time sheet edited',
      data: timeSheet,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'Time sheet not found',
      data: undefined,
      error: true,
    });
  }
};

export default {
  createTimesheet,
  editTimesheet,
};
