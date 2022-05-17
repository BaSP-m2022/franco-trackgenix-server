// import fs from 'fs';
// import { models } from 'mongoose';
import Employees from '../models/Employees';

// const employees = [];

const getById = async (req, res) => {
  try {
    if (req.params.id) {
      const employee = await Employees.findById(req.params.id);
      return res.status(200).json({
        message: 'Success',
        data: employee,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'missing id parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: error,
      error: true,
    });
  }
};

const getFilter = async (req, res) => {
  try {
    if (req.params.id) {
      const employee = await Employees.findById(req.params.id);
      return res.status(200).json({
        message: 'Success',
        data: employee,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'missing id parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const put = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }

    const result = await Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        message: 'The employee has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee edited successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error has ocurred',
      data: undefined,
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
