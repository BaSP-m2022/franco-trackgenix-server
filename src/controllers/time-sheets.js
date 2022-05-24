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
    return res.status(201).json({
      message: 'Time sheet created',
      data: newTimeSheet,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error ocurred',
      data: undefined,
      error: true,
    });
  }
};

const getById = async (req, res) => {
  try {
    const byId = await TimeSheets.findById(req.params.id)
      .populate('tasks')
      .populate('employeeId', { first_name: 1, last_name: 1 });
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
      message: 'Time-sheet was not found',
      data: undefined,
      error: true,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const result = await TimeSheets.find(req.query)
      .populate('tasks')
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
      message: 'A valid parameter is needed',
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
        return res.status(404).json({
          message: 'Time sheet not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Time sheet edited',
        data: timeSheet,
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
