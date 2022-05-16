// import fs from 'fs';
// import { models } from 'mongoose';
import Employees from '../models/Employees';

// const employees = [];

const getById = async (req, res) => {
  try {
    if (req.params.id) {
      const employee = await Employees.findById(req.params.id);
      return res.status(200).json(employee);
    }
    return res.status(400).json({
      msg: 'missing id parameter',
      error: true,
    });
  } catch (error) {
    return res.json({
      msg: error,
      error: true,
    });
  }
};

const getFilter = async (req, res) => {
  try {
    if (req.params.id) {
      const employee = await Employees.findById(req.params.id);
      return res.status(200).json(employee);
    }
    return res.status(400).json({
      msg: 'missing id parameter',
    });
  } catch (error) {
    return res.json({
      msg: error,
    });
  }
};

const put = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    }

    const result = await Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        msg: 'The employee has not been found',
        error: true,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
      error: error.details[0].message,
    });
  }
};

export default {
  getById,
  // deleteById,
  // post,
  getFilter,
  put,
};
