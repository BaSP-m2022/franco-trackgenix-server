import Task from '../models/tasks';

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({});

    return res.status(200).json({
      msg: 'Tasks',
      data: allTasks,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};
const getTasksById = async (req, res) => {
  try {
    if (req.params.id) {
      const taskById = await Task.findById(req.params.id);
      if (!taskById) {
        return res.status(404).json({
          msg: 'Task not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        msg: 'Tasks',
        data: taskById,
        error: false,
      });
    }
    return res.status(400).json({
      msg: 'Please, put an ID for a task',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Task({
      description: req.body.description,
      workedHours: req.body.workedHours,
    });
    const result = await task.save();
    return res.status(201).json({
      msg: 'Task created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'Task not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Task deleted successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'Task not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Task updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
      data: undefined,
      error: error.details[0].message,
    });
  }
};

export default {
  getAllTasks,
  createTask,
  getTasksById,
  deleteTask,
  updateTask,
};
