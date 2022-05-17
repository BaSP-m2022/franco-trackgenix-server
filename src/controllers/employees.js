import Employees from '../models/Employees';

const getById = async (req, res) => {
  try {
    if (req.params.id) {
      const employeeById = await Employees.findById(req.params.id);
      if (!employeeById) {
        res.status(404).json({
          message: 'Employee was not found',
          data: undefined,
          error: true,
        });
      }
      res.status(200).json({
        message: 'Success',
        data: employeeById,
        error: false,
      });
    } else {
      res.status(400).json({
        message: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const getFilter = async (req, res) => {
  try {
    const result = await Employees.find(req.query);
    if (result.length > 0) {
      res.status(200).json({
        message: 'Success',
        data: result,
        error: false,
      });
    } else {
      res.status(404).json({
        message: 'Employee was not found',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const put = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
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
      res.status(404).json({
        message: 'The employee has not been found',
        data: undefined,
        error: true,
      });
    }
    res.status(200).json({
      message: 'Employee edited successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
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
