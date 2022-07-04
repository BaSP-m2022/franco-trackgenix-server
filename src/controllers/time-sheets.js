import TimeSheets from '../models/Time-sheets';

const deleteById = async (req, res) => {
  try {
    const timesheetIdToFilter = await TimeSheets.findByIdAndRemove(req.params.id);
    if (!timesheetIdToFilter) {
      return res.status(404).json({
        message: 'Time-sheet was not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Time-sheet deleted',
      data: timesheetIdToFilter,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getById = async (req, res) => {
  try {
    const byId = await TimeSheets.findById(req.params.id)
      .populate('tasks')
      .populate('employeeId', { firstName: 1, lastName: 1 });
    if (!byId) {
      return res.status(404).json({
        message: 'Time-sheet was not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Time-sheet found',
      data: byId,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const result = await TimeSheets.find(req.query)
      .populate('employeeId', { firstName: 1, lastName: 1 });
    if (result.length > 0) {
      return res.status(200).json({
        message: 'Time-sheets',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Time-sheet was not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const createTimesheet = async (req, res) => {
  try {
    const parsedStartDate = new Date(req.body.startDate);
    const totalHours = req.body.tasks.reduce((partial, task) => partial + task.workedHours, 0);
    const body = {
      tasks: req.body.tasks,
      totalHours,
      startDate: req.body.startDate,
      endDate: parsedStartDate.setDate(parsedStartDate.getDate() + 6),
      employeeId: req.body.employeeId,
    };
    const newTimeSheet = new TimeSheets(body);
    await newTimeSheet.save();
    return res.status(201).json({
      message: 'Time sheet created',
      data: newTimeSheet,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const editTimesheet = async (req, res) => {
  try {
    if (req.params.id) {
      const parsedStartDate = new Date(req.body.startDate);
      const totalHours = req.body.tasks.reduce((partial, task) => partial + task.workedHours, 0);
      const body = {
        tasks: req.body.tasks,
        totalHours,
        startDate: req.body.startDate,
        endDate: parsedStartDate.setDate(parsedStartDate.getDate() + 6),
        employeeId: req.body.employeeId,
      };
      const timeSheet = await TimeSheets.findByIdAndUpdate({ _id: req.params.id }, body);
      if (!timeSheet) {
        return res.status(404).json({
          message: 'Time sheet not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Time sheet edited',
        data: body,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Invalid params',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
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
