import TimeSheets from '../models/Time-sheets';

const deleteById = async (req, res) => {
  try {
    const timesheetIdToFilter = await TimeSheets.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
    );
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
      .find({ isDeleted: false })
      .populate('tasks.projectId', { name: 1 })
      .populate('employeeId', { firstName: 1, lastName: 1 });
    if (!byId.length) {
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
    const result = await TimeSheets.find({ ...req.query, isDeleted: false })
      .populate('tasks.projectId', { name: 1 })
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
    const newTimeSheet = new TimeSheets({ ...req.body, isDeleted: false });
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
        data: req.body,
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
