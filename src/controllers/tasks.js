import Task from '../models/Tasks';

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find(req.query).populate('projectId', { name: 1 });
    if (allTasks.length > 0) {
      return res.status(200).json({
        message: 'Tasks',
        data: allTasks,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Please, put an information about the task',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const getTasksById = async (req, res) => {
  try {
    if (req.params.id) {
      const taskById = await Task.findById(req.params.id).populate('projectId', { name: 1 });
      if (!taskById) {
        return res.status(404).json({
          message: 'Task not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Tasks',
        data: taskById,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Please, put an ID for a task',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const result = await task.save();
    return res.status(201).json({
      message: 'Task created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error ocurred',
      data: error.message,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Task not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Task deleted successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
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
        message: 'Task not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Task updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There was an error',
      data: undefined,
      error: true,
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
